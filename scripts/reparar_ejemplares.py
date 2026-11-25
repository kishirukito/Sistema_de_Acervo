"""
Script: reparar_ejemplares.py
Crea los ejemplares faltantes de libros que ya están en la DB pero no tienen ningún ejemplar.
Usa batch insert (todos los ejemplares de un libro en 1 request) + retry con backoff.

Uso:
    python scripts/reparar_ejemplares.py
    python scripts/reparar_ejemplares.py --dry-run
"""

import sys, os, argparse, openpyxl, requests, time

import dotenv
dotenv.load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SERVICE_KEY  = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
TIMEOUT      = 15   # segundos por request

EXCEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'inventario_CIU_estructurado.xlsx')

HEADERS = {
    'apikey': SERVICE_KEY,
    'Authorization': f'Bearer {SERVICE_KEY}',
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'   # no devuelve el body → más rápido
}


def cargar_libros_db():
    """Devuelve {isbn: libro_id} para todos los libros en DB."""
    libros = {}
    offset, batch = 0, 1000
    print('Cargando libros desde DB...', flush=True)
    while True:
        r = requests.get(
            f'{SUPABASE_URL}/rest/v1/libros?select=id,isbn&limit={batch}&offset={offset}',
            headers=HEADERS, timeout=TIMEOUT
        )
        if r.status_code != 200 or not r.json():
            break
        for row in r.json():
            libros[row['isbn']] = row['id']
        if len(r.json()) < batch:
            break
        offset += batch
    print(f'  → {len(libros)} libros\n', flush=True)
    return libros


def cargar_libro_ids_con_ejemplares():
    """Devuelve set de libro_ids que YA tienen al menos 1 ejemplar."""
    ids = set()
    offset, batch = 0, 1000
    print('Cargando libro_ids con ejemplares...', flush=True)
    while True:
        r = requests.get(
            f'{SUPABASE_URL}/rest/v1/ejemplares?select=libro_id&limit={batch}&offset={offset}',
            headers=HEADERS, timeout=TIMEOUT
        )
        if r.status_code != 200 or not r.json():
            break
        for row in r.json():
            ids.add(row['libro_id'])
        if len(r.json()) < batch:
            break
        offset += batch
    print(f'  → {len(ids)} libros ya tienen ejemplares\n', flush=True)
    return ids


def insertar_batch_con_retry(payload_list, retries=4):
    """
    Inserta una lista de ejemplares en UN solo request.
    Reintenta con backoff exponencial si hay timeout o error 5xx.
    """
    for intento in range(retries):
        try:
            r = requests.post(
                f'{SUPABASE_URL}/rest/v1/ejemplares',
                headers=HEADERS,
                json=payload_list,
                timeout=TIMEOUT
            )
            if r.status_code in (200, 201, 204):
                return True
            # Error recuperable (timeout DB, rate limit)
            if r.status_code in (408, 429, 500, 503, 504):
                wait = 2 ** intento  # 1s, 2s, 4s, 8s
                print(f'    ⚠️  HTTP {r.status_code}, reintento {intento+1} en {wait}s', flush=True)
                time.sleep(wait)
                continue
            # Error no recuperable
            print(f'    ❌ HTTP {r.status_code}: {r.text[:100]}', flush=True)
            return False
        except requests.exceptions.Timeout:
            wait = 2 ** intento
            print(f'    ⚠️  Timeout, reintento {intento+1} en {wait}s', flush=True)
            time.sleep(wait)
    print('    ❌ Fallaron todos los reintentos', flush=True)
    return False


def reparar(dry_run=False):
    print('='*60, flush=True)
    print('REPARACIÓN: Crear ejemplares faltantes (batch insert)', flush=True)
    print('='*60, flush=True)

    libros_db      = cargar_libros_db()
    con_ejemplares = cargar_libro_ids_con_ejemplares()

    # ISBNs que no tienen ningún ejemplar
    sin_ejemplar = {isbn: lid for isbn, lid in libros_db.items()
                    if lid not in con_ejemplares}
    print(f'Libros sin ningún ejemplar: {len(sin_ejemplar)}\n', flush=True)

    if not sin_ejemplar:
        print('✅ Todos los libros ya tienen ejemplares.', flush=True)
        return

    wb = openpyxl.load_workbook(EXCEL_PATH)
    ws = wb.active
    headers_excel = [cell.value for cell in ws[1]]
    col = {h: i for i, h in enumerate(headers_excel)}

    creados = omitidos = errores = 0

    for i, row in enumerate(ws.iter_rows(min_row=2, values_only=True), start=1):
        isbn_raw   = str(row[col['isbn']]).strip() if row[col['isbn']] else None
        isbn       = isbn_raw if (isbn_raw and isbn_raw != 'None') else f'CIU-{i:05d}'
        num_ej     = int(row[col['ejemplares']]) if row[col['ejemplares']] else 1
        ubicacion  = str(row[col['ubicacion']]).strip() if row[col['ubicacion']] else 'Sin asignar'

        if isbn not in sin_ejemplar:
            omitidos += 1
            continue

        libro_id = sin_ejemplar[isbn]

        if dry_run:
            print(f'  [{i}] DRY: {isbn} → {num_ej} ejemplar(es)', flush=True)
            creados += num_ej
            continue

        # ── BATCH: todos los ejemplares del libro en 1 solo INSERT ──
        payload = [
            {
                'libro_id'         : libro_id,
                'codigo_inventario': f'{isbn}-E{j+1:02d}',
                'ubicacion_estante': ubicacion if ubicacion else 'Sin asignar',
                'estado'           : 'disponible'
            }
            for j in range(num_ej)
        ]

        ok = insertar_batch_con_retry(payload)
        if ok:
            creados += num_ej
        else:
            errores += num_ej

        if creados > 0 and creados % 1000 == 0:
            print(f'  ✅ {creados} ejemplares creados...', flush=True)

        # Pausa pequeña entre libros para no saturar
        time.sleep(0.05)

    print('\n' + '='*60, flush=True)
    print('RESULTADO:', flush=True)
    print(f'  ✅ Ejemplares creados : {creados}', flush=True)
    print(f'  ⏭️  Libros ya tenían  : {omitidos}', flush=True)
    print(f'  ❌ Errores           : {errores}', flush=True)
    print('='*60, flush=True)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--dry-run', action='store_true')
    args = parser.parse_args()
    reparar(dry_run=args.dry_run)
