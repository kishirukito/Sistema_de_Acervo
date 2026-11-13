"""
Verificación de regresión post-migración: tipos_prestamo, carreras, instituciones,
préstamos interbibliotecarios y trazabilidad.
"""
import os, sys, time, json
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))
from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), '..', 'backend', '.env'))
import requests

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
API_BASE = "http://127.0.0.1:8000/api/v1"

HEADERS_SB = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SUPABASE_KEY}",
    "Content-Type": "application/json",
}

results = []

def check(name, condition, detail=""):
    status = "✅ PASS" if condition else "❌ FAIL"
    results.append({"test": name, "status": status, "detail": detail})
    print(f"{status}  {name}" + (f"\n       {detail}" if detail else ""))

# ── LOGIN ─────────────────────────────────────────────────────────────────────
print("\n── Autenticación ──")
t0 = time.time()
r = requests.post(f"{API_BASE}/auth/login", json={"email": "admin@upd.edu.mx", "password": "admin123"})
login_ms = round((time.time() - t0) * 1000)
check("POST /auth/login → 200", r.status_code == 200, f"{login_ms} ms")
token = r.json().get("token", "") if r.ok else ""
auth = {"Authorization": f"Bearer {token}"}

# ── CATÁLOGOS ─────────────────────────────────────────────────────────────────
print("\n── Catálogos ──")
r = requests.get(f"{API_BASE}/data/tipos-prestamo", headers=auth)
tipos = r.json() if r.ok else []
check("GET /tipos-prestamo → 200", r.status_code == 200)
check("3 tipos: domicilio, sala, interbibliotecario", len(tipos) == 3,
      str([t.get("clave") for t in tipos]))

r = requests.get(f"{API_BASE}/data/carreras", headers=auth)
carreras = r.json() if r.ok else []
check("GET /carreras → 200", r.status_code == 200)
check("23 carreras UNIPOLI", len(carreras) == 23, f"encontradas: {len(carreras)}")

r = requests.get(f"{API_BASE}/data/instituciones", headers=auth)
check("GET /instituciones → 200", r.status_code == 200, f"registros: {len(r.json()) if r.ok else 'err'}")

# ── CREAR INSTITUCIÓN ─────────────────────────────────────────────────────────
print("\n── Institución de prueba ──")
r = requests.post(f"{API_BASE}/data/instituciones", headers=auth, json={
    "nombre": "CBTIS No. 123 (Prueba)",
    "nombre_biblioteca": "Biblioteca CBTIS 123",
    "clave_convenio": "CBTIS-123-TEST",
    "responsable_titular": "Lic. Prueba Test"
})
check("POST /instituciones → 200/201", r.status_code in (200, 201))
inst_id = None
if r.ok:
    data = r.json()
    inst_id = (data[0].get("id") if isinstance(data, list) else data.get("id"))
    check("Institución creada con ID", bool(inst_id), str(inst_id))

# ── PRÉSTAMO INTERBIBLIOTECARIO ───────────────────────────────────────────────
print("\n── Préstamo interbibliotecario ──")
# Obtener un ejemplar disponible
r_ej = requests.get(
    f"{SUPABASE_URL}/rest/v1/ejemplares?estado=eq.disponible&select=id&limit=1",
    headers=HEADERS_SB
)
ej_id = r_ej.json()[0]["id"] if r_ej.ok and r_ej.json() else None
check("Ejemplar disponible encontrado", bool(ej_id), str(ej_id))

loan_id = None
if ej_id and inst_id:
    t0 = time.time()
    r = requests.post(f"{API_BASE}/data/prestamos", headers=auth, json={
        "tipo_prestamo": "interbibliotecario",
        "ejemplar_id": ej_id,
        "institucion_id": inst_id,
        "responsable_externo_nombre": "Mtro. Verificación QA",
        "responsable_externo_cargo": "Responsable de Biblioteca",
        "responsable_externo_contacto": "qa@cbtis123.edu.mx",
        "folio_oficio": "OF-QA-2026-001"
    })
    loan_ms = round((time.time() - t0) * 1000)
    check("POST /prestamos interbibliotecario → 200", r.status_code == 200, f"{loan_ms} ms | {r.text[:120]}")
    if r.ok:
        loan_data = r.json()
        if isinstance(loan_data, list): loan_data = loan_data[0]
        loan_id = loan_data.get("id")
        check("autorizado_por_id asignado automáticamente", bool(loan_data.get("autorizado_por_id")))
        check("folio_oficio guardado", loan_data.get("folio_oficio") == "OF-QA-2026-001")

# ── GET PRÉSTAMOS (relaciones) ────────────────────────────────────────────────
print("\n── GET préstamos con relaciones ──")
r = requests.get(f"{API_BASE}/data/prestamos", headers=auth)
check("GET /prestamos → 200", r.status_code == 200)
if r.ok and r.json():
    p = r.json()[0]
    # El router devuelve modelo DB raw; tipoPrestamoClave se mapea en el frontend.
    # Verificamos que tipo_prestamo_id esté presente (FK al catálogo)
    check("Campo tipo_prestamo_id presente (FK a catálogo)", "tipo_prestamo_id" in p, str(list(p.keys())[:8]))

# ── SIABUC ────────────────────────────────────────────────────────────────────
print("\n── Reporte SIABUC ──")
t0 = time.time()
r = requests.get(f"{API_BASE}/reports/siabuc", headers=auth)
siabuc_ms = round((time.time() - t0) * 1000)
check("GET /reports/siabuc → 200", r.status_code == 200, f"{siabuc_ms} ms")

# ── LIMPIEZA ──────────────────────────────────────────────────────────────────
print("\n── Limpieza registros de prueba ──")
if loan_id:
    r = requests.delete(f"{SUPABASE_URL}/rest/v1/prestamos?id=eq.{loan_id}", headers=HEADERS_SB)
    check("DELETE préstamo prueba", r.status_code in (200, 204), loan_id)
    # restore ejemplar
    if ej_id:
        requests.patch(f"{SUPABASE_URL}/rest/v1/ejemplares?id=eq.{ej_id}",
                       headers={**HEADERS_SB, "Prefer": ""}, json={"estado": "disponible"})
if inst_id:
    r = requests.delete(f"{SUPABASE_URL}/rest/v1/instituciones_convenio?id=eq.{inst_id}", headers=HEADERS_SB)
    check("DELETE institución prueba", r.status_code in (200, 204), inst_id)

# ── RESUMEN ───────────────────────────────────────────────────────────────────
print("\n" + "═"*55)
passed = sum(1 for x in results if "PASS" in x["status"])
total  = len(results)
print(f"RESULTADO: {passed}/{total} pruebas exitosas")
print("═"*55)
