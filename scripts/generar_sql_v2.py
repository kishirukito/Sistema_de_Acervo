"""
Genera SQL eficiente: un solo INSERT...SELECT por parte,
usando SET statement_timeout = '0' para deshabilitar el limite.
"""
import openpyxl, os

EXCEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'inventario_CIU_estructurado.xlsx')
OUT_DIR    = os.path.join(os.path.dirname(__file__), '..', 'migrations', 'partes_v2')
os.makedirs(OUT_DIR, exist_ok=True)

wb = openpyxl.load_workbook(EXCEL_PATH)
ws = wb.active
headers = [cell.value for cell in ws[1]]
col = {h: i for i, h in enumerate(headers)}

# Construir lista de todos los (isbn, codigo, ubicacion)
all_rows = []
for i, row in enumerate(ws.iter_rows(min_row=2, values_only=True), start=1):
    isbn_raw  = str(row[col['isbn']]).strip() if row[col['isbn']] else None
    isbn      = isbn_raw if (isbn_raw and isbn_raw != 'None') else f'CIU-{i:05d}'
    num_ej    = int(row[col['ejemplares']]) if row[col['ejemplares']] else 1
    ubicacion = str(row[col['ubicacion']]).strip() if row[col['ubicacion']] else 'Sin asignar'
    if not ubicacion or ubicacion == 'None':
        ubicacion = 'Sin asignar'

    isbn_esc = isbn.replace("'", "''")
    ubic_esc = ubicacion.replace("'", "''")

    for j in range(num_ej):
        codigo = f"{isbn}-E{j+1:02d}".replace("'", "''")
        all_rows.append((isbn_esc, codigo, ubic_esc))

print(f"Total filas a insertar: {len(all_rows)}")

# Dividir en partes de 1000 filas cada una (rapido y seguro)
PARTE_SIZE = 1000
partes = [all_rows[i:i+PARTE_SIZE] for i in range(0, len(all_rows), PARTE_SIZE)]

CABECERA = """-- =============================================================
-- Migracion 002 v2 - Parte {num} de {total}
-- INSERT eficiente: un solo statement con VALUES masivo
-- Instrucciones:
--   1. Pegar en Supabase SQL Editor
--   2. Dar click en Run
--   3. Esperar confirmacion, luego ejecutar la siguiente parte
-- =============================================================

-- Deshabilitar timeout para esta sesion
SET statement_timeout = '0';

-- Insertar solo ejemplares de libros que AUN no tienen ninguno
INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado)
SELECT l.id, v.codigo, v.ubicacion, 'disponible'
FROM (VALUES
"""

PIE = """) AS v(isbn, codigo, ubicacion)
JOIN libros l ON l.isbn = v.isbn
WHERE NOT EXISTS (
  SELECT 1 FROM ejemplares e WHERE e.libro_id = l.id
)
ON CONFLICT (codigo_inventario) DO NOTHING;
"""

for idx, parte in enumerate(partes, start=1):
    vals = ",\n".join(f"  ('{r[0]}', '{r[1]}', '{r[2]}')" for r in parte)
    sql  = CABECERA.format(num=idx, total=len(partes)) + vals + "\n" + PIE
    fname = os.path.join(OUT_DIR, f'002_v2_parte_{idx:02d}.sql')
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(sql)
    size_kb = len(sql.encode('utf-8')) / 1024
    print(f"  Parte {idx:02d}: {len(parte)} filas — {size_kb:.0f} KB")

print(f"\nTotal: {len(partes)} archivos en migrations/partes_v2/")
