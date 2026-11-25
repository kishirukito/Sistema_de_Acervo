"""
Script: importar_inventario_excel.py
Descripción: Importa el inventario del Excel (inventario_CIU_estructurado.xlsx)
             a Supabase, detectando automáticamente el tipo de material
             (Libro / Tesis / Donación) desde el prefijo en clasificacion_original.

PREREQUISITO: Ejecutar primero migrations/001_add_tipos_material.sql en Supabase.

Uso:
    python scripts/importar_inventario_excel.py
    python scripts/importar_inventario_excel.py --dry-run   (solo muestra, no inserta)
    python scripts/importar_inventario_excel.py --limite 50 (prueba con 50 filas)
"""

import sys
import os
import argparse
import openpyxl
import requests
import time

import dotenv  # pip install python-dotenv
dotenv.load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SERVICE_KEY  = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
TIMEOUT      = 10

if not SUPABASE_URL or not SERVICE_KEY:
    print("❌ Faltan variables de entorno SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY en .env", flush=True)
    sys.exit(1)

EXCEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'inventario_CIU_estructurado.xlsx')

HEADERS = {
    'apikey': SERVICE_KEY,
    'Authorization': f'Bearer {SERVICE_KEY}',
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
}

# ── Prefijos que indican tipo de material ─────────────────────────────────────
PREFIJOS_TESIS    = {'PYMES', 'ITM', 'ITA', 'ITDGO', 'UPD', 'UADEO'}
PREFIJOS_DONACION = {'DO'}

def detectar_tipo(clasificacion_original):
    if not clasificacion_original:
        return 'Libro'
    tokens = str(clasificacion_original).strip().split()
    if not tokens:
        return 'Libro'
    prefijo = tokens[0].upper()
    if prefijo in PREFIJOS_TESIS:
        return 'Tesis'
    if prefijo in PREFIJOS_DONACION:
        return 'Donación'
    return 'Libro'


def get_tipos_material():
    r = requests.get(f'{SUPABASE_URL}/rest/v1/tipos_material?select=id,nombre', headers=HEADERS, timeout=TIMEOUT)
    if r.status_code != 200:
        print(f'❌ Error al leer tipos_material: {r.status_code} {r.text}', flush=True)
        sys.exit(1)
    return {row['nombre']: row['id'] for row in r.json()}


def cargar_isbns_existentes():
    """Carga TODOS los ISBNs existentes en la DB de una sola vez (evita N requests)."""
    todos = set()
    offset, batch = 0, 1000
    print('Cargando ISBNs existentes desde la DB...', flush=True)
    while True:
        try:
            r = requests.get(
                f'{SUPABASE_URL}/rest/v1/libros?select=isbn&limit={batch}&offset={offset}',
                headers=HEADERS, timeout=TIMEOUT
            )
            if r.status_code != 200 or not r.json():
                break
            datos = r.json()
            for row in datos:
                if row.get('isbn'):
                    todos.add(row['isbn'])
            if len(datos) < batch:
                break
            offset += batch
        except requests.exceptions.Timeout:
            print('  ⚠️  Timeout cargando ISBNs', flush=True)
            break
    print(f'  → {len(todos)} ISBNs ya en la DB\n', flush=True)
    return todos


def get_o_crear_editorial(nombre, cache):
    nombre = nombre.strip() if nombre else None
    if not nombre:
        return None
    if nombre in cache:
        return cache[nombre]
    try:
        r = requests.get(
            f'{SUPABASE_URL}/rest/v1/editoriales?nombre=eq.{requests.utils.quote(nombre)}&select=id',
            headers=HEADERS, timeout=TIMEOUT
        )
        if r.status_code == 200 and r.json():
            eid = r.json()[0]['id']
            cache[nombre] = eid
            return eid
        r = requests.post(
            f'{SUPABASE_URL}/rest/v1/editoriales',
            headers=HEADERS, json={'nombre': nombre}, timeout=TIMEOUT
        )
        if r.status_code in (200, 201) and r.json():
            eid = r.json()[0]['id']
            cache[nombre] = eid
            return eid
    except requests.exceptions.Timeout:
        print(f'  ⚠️  Timeout editorial: {nombre}', flush=True)
    return None


def get_o_crear_autor(nombre, cache):
    nombre = nombre.strip() if nombre else None
    if not nombre:
        return None
    if nombre in cache:
        return cache[nombre]
    try:
        r = requests.get(
            f'{SUPABASE_URL}/rest/v1/autores?nombre=eq.{requests.utils.quote(nombre)}&select=id',
            headers=HEADERS, timeout=TIMEOUT
        )
        if r.status_code == 200 and r.json():
            aid = r.json()[0]['id']
            cache[nombre] = aid
            return aid
        r = requests.post(
            f'{SUPABASE_URL}/rest/v1/autores',
            headers=HEADERS, json={'nombre': nombre}, timeout=TIMEOUT
        )
        if r.status_code in (200, 201) and r.json():
            aid = r.json()[0]['id']
            cache[nombre] = aid
            return aid
    except requests.exceptions.Timeout:
        print(f'  ⚠️  Timeout autor: {nombre}', flush=True)
    return None


def importar(dry_run=False, limite=None):
    print('='*60, flush=True)
    print('IMPORTACIÓN: inventario_CIU_estructurado.xlsx → Supabase', flush=True)
    print('='*60, flush=True)
    if dry_run:
        print('⚠️  MODO DRY-RUN: no se insertará nada en la DB\n', flush=True)

    tipos = get_tipos_material()
    print(f'Tipos de material: {tipos}\n', flush=True)

    # Cargar ISBNs existentes en 1 sola consulta
    isbns_existentes = cargar_isbns_existentes() if not dry_run else set()

    wb = openpyxl.load_workbook(EXCEL_PATH)
    ws = wb.active
    headers_excel = [cell.value for cell in ws[1]]
    print(f'Columnas: {headers_excel}', flush=True)
    print(f'Total filas: {ws.max_row - 1}\n', flush=True)

    col = {h: i for i, h in enumerate(headers_excel)}
    insertados = omitidos = errores = 0
    cache_editoriales = {}
    cache_autores = {}

    rows = list(ws.iter_rows(min_row=2, values_only=True))
    if limite:
        rows = rows[:limite]

    for i, row in enumerate(rows, start=1):
        try:
            isbn             = str(row[col['isbn']]).strip() if row[col['isbn']] else None
            titulo           = str(row[col['titulo']]).strip() if row[col['titulo']] else None
            autor_nombre     = str(row[col['autor']]).strip() if row[col['autor']] else None
            editorial_nombre = str(row[col['editorial']]).strip() if row[col['editorial']] else None
            anio             = row[col['anio_publicacion']]
            num_ejemplares   = int(row[col['ejemplares']]) if row[col['ejemplares']] else 1
            ubicacion        = str(row[col['ubicacion']]).strip() if row[col['ubicacion']] else None
            portada_url      = str(row[col['url_img']]).strip() if row[col['url_img']] else None
            edicion          = str(row[col['edicion']]).strip() if row[col['edicion']] else None
            clasificacion_raw= str(row[col['clasificacion_original']]).strip() if row[col['clasificacion_original']] else None

            if not titulo:
                omitidos += 1
                continue

            # ISBN interno si no tiene
            if not isbn or isbn == 'None':
                isbn = f'CIU-{i:05d}'

            # Verificar duplicado (lookup local, sin HTTP)
            if not dry_run and isbn in isbns_existentes:
                omitidos += 1
                continue

            tipo_nombre  = detectar_tipo(clasificacion_raw)
            tipo_id      = tipos.get(tipo_nombre)
            editorial_id = None if dry_run else get_o_crear_editorial(editorial_nombre, cache_editoriales)
            autor_id     = None if dry_run else get_o_crear_autor(autor_nombre, cache_autores)

            libro_payload = {k: v for k, v in {
                'isbn'              : isbn,
                'titulo'            : titulo[:255],
                'anio_publicacion'  : int(anio) if anio else None,
                'edicion'           : edicion[:50] if edicion else None,
                'portada_url'       : portada_url,
                'editorial_id'      : editorial_id,
                'tipo_material_id'  : tipo_id,
                'clasificacion_dewey': clasificacion_raw,
            }.items() if v is not None}

            if dry_run:
                print(f'  [{i}] DRY: "{titulo[:50]}" → {tipo_nombre} | {clasificacion_raw}', flush=True)
                insertados += 1
                continue

            # Insertar libro
            try:
                r_lib = requests.post(
                    f'{SUPABASE_URL}/rest/v1/libros',
                    headers=HEADERS, json=libro_payload, timeout=TIMEOUT
                )
            except requests.exceptions.Timeout:
                print(f'  [{i}] ⏱️  Timeout libro "{titulo[:40]}"', flush=True)
                errores += 1
                continue

            if r_lib.status_code not in (200, 201):
                print(f'  [{i}] ❌ Error libro: {r_lib.status_code} {r_lib.text[:120]}', flush=True)
                errores += 1
                continue

            libro_id = r_lib.json()[0]['id']

            # Vincular autor
            if autor_id:
                try:
                    requests.post(
                        f'{SUPABASE_URL}/rest/v1/libro_autores',
                        headers=HEADERS,
                        json={'libro_id': libro_id, 'autor_id': autor_id, 'orden': 1},
                        timeout=TIMEOUT
                    )
                except requests.exceptions.Timeout:
                    pass

            # Crear ejemplares — codigo único basado en ISBN + número de copia
            for j in range(num_ejemplares):
                codigo = f'{isbn}-E{j+1:02d}'  # ISBN es único → código siempre único
                try:
                    requests.post(
                        f'{SUPABASE_URL}/rest/v1/ejemplares',
                        headers=HEADERS,
                        json={
                            'libro_id'         : libro_id,
                            'codigo_inventario': codigo[:50],
                            'ubicacion_estante': ubicacion if ubicacion else 'Sin asignar',
                            'estado'           : 'disponible'
                        },
                        timeout=TIMEOUT
                    )
                except requests.exceptions.Timeout:
                    print(f'  [{i}] ⏱️  Timeout ejemplar {j+1}', flush=True)

            # Agregar a cache local para evitar duplicados en esta misma corrida
            isbns_existentes.add(isbn)
            insertados += 1
            if insertados % 100 == 0:
                print(f'  ✅ {insertados} libros insertados...', flush=True)
            time.sleep(0.03)

        except Exception as e:
            print(f'  [{i}] ⚠️  Excepción: {e}', flush=True)
            errores += 1

    print('\n' + '='*60, flush=True)
    print('RESULTADO FINAL:', flush=True)
    print(f'  ✅ Insertados : {insertados}', flush=True)
    print(f'  ⏭️  Omitidos  : {omitidos}', flush=True)
    print(f'  ❌ Errores   : {errores}', flush=True)
    print('='*60, flush=True)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Importar inventario Excel a Supabase')
    parser.add_argument('--dry-run', action='store_true', help='Solo muestra, sin insertar')
    parser.add_argument('--limite', type=int, default=None, help='Limitar a N filas')
    args = parser.parse_args()
    importar(dry_run=args.dry_run, limite=args.limite)
