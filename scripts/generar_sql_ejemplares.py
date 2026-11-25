import openpyxl, os

EXCEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'inventario_CIU_estructurado.xlsx')
OUT_PATH   = os.path.join(os.path.dirname(__file__), '..', 'migrations', '002_reparar_ejemplares.sql')

wb = openpyxl.load_workbook(EXCEL_PATH)
ws = wb.active
headers = [cell.value for cell in ws[1]]
col = {h: i for i, h in enumerate(headers)}

lines = [
    "-- ============================================================",
    "-- Migracion 002: Crear ejemplares faltantes",
    "-- Solo inserta para libros que NO tienen ningun ejemplar aun.",
    "-- Ejecutar en: Supabase SQL Editor",
    "-- ============================================================",
    "",
    "DO $$",
    "DECLARE v_lid UUID;",
    "BEGIN",
    "",
]

total_ej = 0
total_libros = 0

for i, row in enumerate(ws.iter_rows(min_row=2, values_only=True), start=1):
    isbn_raw  = str(row[col['isbn']]).strip() if row[col['isbn']] else None
    isbn      = isbn_raw if (isbn_raw and isbn_raw != 'None') else f'CIU-{i:05d}'
    num_ej    = int(row[col['ejemplares']]) if row[col['ejemplares']] else 1
    ubicacion = str(row[col['ubicacion']]).strip() if row[col['ubicacion']] else 'Sin asignar'
    if not ubicacion or ubicacion == 'None':
        ubicacion = 'Sin asignar'

    isbn_esc = isbn.replace("'", "''")
    ubic_esc = ubicacion.replace("'", "''")

    lines.append(f"  -- [{i}] ISBN: {isbn_esc}")
    lines.append(f"  SELECT id INTO v_lid FROM libros WHERE isbn = '{isbn_esc}' LIMIT 1;")
    lines.append(f"  IF v_lid IS NOT NULL AND NOT EXISTS (SELECT 1 FROM ejemplares WHERE libro_id = v_lid) THEN")

    # Generar VALUES de los ejemplares
    vals = []
    for j in range(num_ej):
        codigo = f"{isbn}-E{j+1:02d}".replace("'", "''")
        vals.append(f"      (v_lid, '{codigo}', '{ubic_esc}', 'disponible')")

    lines.append("    INSERT INTO ejemplares (libro_id, codigo_inventario, ubicacion_estante, estado) VALUES")
    lines.append(",\n".join(vals) + ";")
    lines.append("  END IF;")
    lines.append("")
    total_ej += num_ej
    total_libros += 1

lines.append("END $$;")
lines.append("")
lines.append(f"-- FIN: {total_libros} libros evaluados, hasta {total_ej} ejemplares posibles")

sql = "\n".join(lines)
os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
with open(OUT_PATH, 'w', encoding='utf-8') as f:
    f.write(sql)

size_kb = len(sql.encode('utf-8')) / 1024
print(f"SQL generado: {len(lines)} lineas, {size_kb:.1f} KB")
print(f"Libros: {total_libros} | Ejemplares estimados: {total_ej}")
print(f"Archivo: {OUT_PATH}")
