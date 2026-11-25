"""Divide 002_reparar_ejemplares.sql en partes manejables para Supabase SQL Editor."""
import os, re

SQL_PATH = os.path.join(os.path.dirname(__file__), '..', 'migrations', '002_reparar_ejemplares.sql')
OUT_DIR  = os.path.join(os.path.dirname(__file__), '..', 'migrations', 'partes')
os.makedirs(OUT_DIR, exist_ok=True)

with open(SQL_PATH, encoding='utf-8') as f:
    content = f.read()

# Separar bloques individuales por libro (delimitados por lineas "  -- [N]")
# Cabecera y pie
cabecera = "DO $$\nDECLARE v_lid UUID;\nBEGIN\n\n"
pie      = "END $$;\n"

# Extraer bloques entre BEGIN y END
inner = content.split("BEGIN\n\n")[1].split("\nEND $$;")[0]
bloques = re.split(r'\n(?=  -- \[)', inner)
bloques = [b for b in bloques if b.strip()]

PARTE_SIZE = 400  # libros por parte
partes = [bloques[i:i+PARTE_SIZE] for i in range(0, len(bloques), PARTE_SIZE)]

for idx, parte in enumerate(partes, start=1):
    sql = cabecera + "\n".join(parte) + "\n\n" + pie
    fname = os.path.join(OUT_DIR, f'002_parte_{idx:02d}.sql')
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(f"-- Parte {idx} de {len(partes)} ({len(parte)} libros)\n{sql}")
    size_kb = len(sql.encode('utf-8')) / 1024
    print(f"  Parte {idx:02d}: {len(parte)} libros — {size_kb:.0f} KB → {fname}")

print(f"\nTotal: {len(partes)} archivos generados en migrations/partes/")
