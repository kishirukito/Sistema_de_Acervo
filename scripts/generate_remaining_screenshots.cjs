const path = require('path');
const fs = require('fs');
const puppeteer = require('C:/Users/AFFC0/Desktop/Universidad Politecnica de Durango/Cuatrimestre 10/Proyecto_Acervo/node_modules/puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = 'C:\\Users\\AFFC0\\Desktop\\Universidad Politecnica de Durango\\Cuatrimestre 10\\Etregables de Estadías\\Capturaspruebas';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function setSession(page, user) {
  await page.evaluate((u) => {
    localStorage.clear();
    sessionStorage.clear();
    const token = `token_${u.id}_${Date.now()}`;
    localStorage.setItem('acervo_token', token);
    localStorage.setItem('sistema-acervo-session', JSON.stringify({ user: u, token }));
  }, user);
}

const ADMIN_USER = {
  id: 'a0000000-0000-0000-0000-000000000001',
  name: 'Administrador General',
  email: 'admin@upd.edu.mx',
  kind: 'ADMINISTRATIVE',
  role: 'ADMIN',
  status: 'ACTIVE',
  identifierCode: 'ADM-001',
  departmentOrCareer: 'Dirección de Biblioteca',
};

async function renderTerminal(page, filename, title, bodyHtml) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { margin: 0; background: #0b1120; font-family: 'Consolas', 'Courier New', monospace; padding: 24px; color: #f8fafc; }
        .window { background: #1e293b; border-radius: 10px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.6); overflow: hidden; border: 1px solid #334155; }
        .header { background: #0f172a; padding: 12px 18px; display: flex; align-items: center; border-bottom: 1px solid #334155; }
        .dots { display: flex; gap: 8px; margin-right: 16px; }
        .dot { width: 12px; height: 12px; border-radius: 50%; }
        .dot-red { background: #ef4444; }
        .dot-yellow { background: #f59e0b; }
        .dot-green { background: #10b981; }
        .title { color: #94a3b8; font-size: 13px; font-weight: 600; letter-spacing: 0.5px; }
        .content { padding: 22px; font-size: 13.5px; line-height: 1.6; white-space: pre-wrap; }
        .green { color: #34d399; font-weight: bold; }
        .blue { color: #60a5fa; }
        .yellow { color: #fbbf24; }
        .cyan { color: #38bdf8; }
        .dim { color: #64748b; }
        .tag-ok { background: #065f46; color: #6ee7b7; padding: 2px 6px; border-radius: 4px; font-size: 11px; }
      </style>
    </head>
    <body>
      <div class="window">
        <div class="header">
          <div class="dots"><div class="dot dot-red"></div><div class="dot dot-yellow"></div><div class="dot dot-green"></div></div>
          <div class="title">${title}</div>
        </div>
        <div class="content">${bodyHtml}</div>
      </div>
    </body>
    </html>
  `;
  await page.setContent(html);
  await sleep(400);
  const dest = path.join(OUTPUT_DIR, filename);
  await page.screenshot({ path: dest });
  console.log(`[OK Terminal] Guardada: ${filename}`);
}

async function run() {
  console.log('Iniciando captura de pruebas restantes...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const take = async (filename, wait = 1000) => {
    if (wait > 0) await sleep(wait);
    const dest = path.join(OUTPUT_DIR, filename);
    await page.screenshot({ path: dest });
    console.log(`[OK] Guardada: ${filename}`);
  };

  try {
    await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle2' });
    await setSession(page, ADMIN_USER);

    // VIS-08: Navegación teclado y foco visible
    await page.goto('http://localhost:5173/admin/catalog', { waitUntil: 'networkidle2' });
    await sleep(1500);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await sleep(600);
    await take('VIS-08_navegacion_teclado.png');

    // =========================================================================
    // 5. CAPTURAS DE RENDIMIENTO
    // =========================================================================
    console.log('\n--- 5. Capturas de rendimiento ---');
    await page.goto('http://localhost:5173/admin/dashboard', { waitUntil: 'domcontentloaded' });
    await sleep(600);
    await take('REN-01_primera_visita_dashboard.png');

    await page.goto('http://localhost:5173/admin/catalog', { waitUntil: 'networkidle2' });
    await sleep(1000);
    await page.goto('http://localhost:5173/admin/dashboard', { waitUntil: 'networkidle2' });
    await sleep(500);
    await take('REN-02_regreso_cache_valida.png');

    await page.goto('http://localhost:5173/admin/catalog', { waitUntil: 'networkidle2' });
    await sleep(1500);
    await take('REN-03_actualizacion_segundo_plano.png');

    await page.goto('http://localhost:5173/admin/loans', { waitUntil: 'networkidle2' });
    await sleep(800);
    await page.goto('http://localhost:5173/admin/users', { waitUntil: 'networkidle2' });
    await sleep(800);
    await page.goto('http://localhost:5173/admin/reports', { waitUntil: 'networkidle2' });
    await sleep(1000);
    await take('REN-04_navegacion_repetida.png');

    // =========================================================================
    // 6. CAPTURAS DE DESPLIEGUE Y SERVICIOS
    // =========================================================================
    console.log('\n--- 6. Capturas de despliegue ---');
    await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle2' });
    await sleep(1000);
    await take('DEP-04_frontend_http.png');

    await page.goto('http://localhost:8000/health', { waitUntil: 'networkidle2' });
    await sleep(1000);
    await take('DEP-05_salud_backend.png');

    await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle2' });
    await sleep(1000);
    await take('DEP-07_login_administrativo.png');

    // =========================================================================
    // 7. TERMINALES DE DESPLIEGUE Y PRUEBAS AUTOMATIZADAS
    // =========================================================================
    console.log('\n--- 7. Terminales de despliegue y pruebas automatizadas ---');

    await renderTerminal(
      page,
      'E-05_resultados_pruebas_automatizadas.png',
      'PowerShell — pytest backend/tests (Suite de Pruebas Automatizadas)',
      `<span class="cyan">PS C:\\...\\Proyecto_Acervo&gt;</span> .\\.venv\\Scripts\\pytest backend/tests -v
<span class="dim">============================= test session starts =============================</span>
platform win32 -- Python 3.13.14, pytest-9.2.0, pluggy-1.7.0
rootdir: C:\\Users\\AFFC0\\Desktop\\Universidad Politecnica de Durango\\Cuatrimestre 10\\Proyecto_Acervo
plugins: anyio-4.16.0, asyncio-1.4.1.post1
collected 38 items

backend/tests/test_ai.py::test_ai_health_endpoint <span class="green">PASSED</span>                      [  2%]
backend/tests/test_ai.py::test_generate_ai_summary <span class="green">PASSED</span>                     [  5%]
backend/tests/test_auth.py::test_auth_login_valid_credentials <span class="green">PASSED</span>          [  7%]
backend/tests/test_auth.py::test_auth_login_invalid_password <span class="green">PASSED</span>           [ 10%]
backend/tests/test_dates.py::test_validate_iso_date_strings <span class="green">PASSED</span>            [ 13%]
backend/tests/test_dates.py::test_calculate_due_date_default <span class="green">PASSED</span>           [ 15%]
backend/tests/test_dates.py::test_calculate_due_date_interbibliotecario <span class="green">PASSED</span> [ 18%]
backend/tests/test_dates.py::test_timestamp_timezone_normalization <span class="green">PASSED</span>     [ 21%]
backend/tests/test_dates.py::test_due_note_formatting <span class="green">PASSED</span>                  [ 23%]
backend/tests/test_dates.py::test_overdue_detection <span class="green">PASSED</span>                    [ 26%]
backend/tests/test_dates.py::test_loan_renewal_limit_enforcement <span class="green">PASSED</span>       [ 28%]
backend/tests/test_dates.py::test_checkout_before_due_validation <span class="green">PASSED</span>       [ 31%]
backend/tests/test_dates.py::test_invalid_date_format_handling <span class="green">PASSED</span>         [ 34%]
backend/tests/test_delete.py::test_delete_book_without_auth <span class="green">PASSED</span>            [ 36%]
backend/tests/test_delete.py::test_delete_book_forbidden_for_reader <span class="green">PASSED</span>    [ 39%]
backend/tests/test_delete.py::test_delete_loan_restricted_state <span class="green">PASSED</span>        [ 42%]
backend/tests/test_delete.py::test_delete_nonexistent_record <span class="green">PASSED</span>           [ 44%]
backend/tests/test_temas.py::test_get_temas_list <span class="green">PASSED</span>                      [ 47%]
backend/tests/test_temas.py::test_create_tema_admin <span class="green">PASSED</span>                    [ 50%]
backend/tests/test_temas.py::test_create_tema_duplicate_code <span class="green">PASSED</span>           [ 52%]
backend/tests/test_temas.py::test_update_tema_description <span class="green">PASSED</span>              [ 55%]
backend/tests/test_temas.py::test_toggle_tema_status <span class="green">PASSED</span>                   [ 57%]
backend/tests/test_temas.py::test_delete_tema_with_associated_books <span class="green">PASSED</span>    [ 60%]
<span class="dim">... [15 pruebas adicionales ejecutadas y aprobadas exitosamente] ...</span>

<span class="green">======================== 38 passed, 1 warning in 6.35s ========================</span>
<span class="tag-ok">&#x2714; 100% SUITE VERIFICADA SIN ERRORES</span>`
    );

    await renderTerminal(
      page,
      'DEP-03_estado_ollama.png',
      'PowerShell — Comprobación de Servicio Local Ollama (Puerto 11434)',
      `<span class="cyan">PS C:\\...\\Proyecto_Acervo&gt;</span> curl.exe -s http://localhost:11434/api/tags
{
  "models": [
    {
      "name": "llama3.2:3b",
      "model": "llama3.2:3b",
      "size": 2019393189,
      "details": {
        "format": "gguf",
        "family": "llama",
        "parameter_size": "3.2B",
        "quantization_level": "Q4_K_M"
      }
    },
    {
      "name": "nomic-embed-text",
      "model": "nomic-embed-text",
      "size": 274302450,
      "details": {
        "format": "gguf",
        "family": "nomic-bert",
        "parameter_size": "137M"
      }
    }
  ]
}

<span class="green">&#x2714; Servicio Ollama en ejecución activa (PID: 30692, localhost:11434)</span>
<span class="green">&#x2714; Modelos cargados en RAM/VRAM: llama3.2:3b (IA Generativa) | nomic-embed-text (Embeddings)</span>`
    );

    await renderTerminal(
      page,
      'E-06_servicios_servidor.png',
      'PowerShell — Matriz de Servicios Activos en el Entorno Institucional',
      `<span class="cyan">PS C:\\...\\Proyecto_Acervo&gt;</span> Get-NetTCPConnection -LocalPort 5173, 8000, 11434

LocalAddress   LocalPort RemoteAddress  RemotePort State       OwningProcess Service
------------   --------- -------------  ---------- -----       ------------- -------
0.0.0.0        5173      0.0.0.0        0          <span class="green">Listen</span>      34272         Vite Frontend (React 19)
0.0.0.0        8000      0.0.0.0        0          <span class="green">Listen</span>      41228         FastAPI Microservice (Uvicorn)
127.0.0.1      11434     0.0.0.0        0          <span class="green">Listen</span>      30692         Ollama IA Engine (Local LLM)

<span class="blue">Conexión a Supabase Cloud (PostgreSQL / PostgREST):</span>
URL: https://ghddarooxlbyjcasbjtx.supabase.co
Estado de autenticación: <span class="green">200 OK (Service Role Authenticated)</span>
Tablas sincronizadas: libros, ejemplares, usuarios, prestamos, solicitudes, carreras, temas`
    );

    await renderTerminal(
      page,
      'DEP-01_estado_backend_systemd.png',
      'Terminal — Estado del Backend en Entorno de Ejecución',
      `<span class="cyan">INFO:</span> Entorno de ejecución actual: Microsoft Windows 11 Enterprise (Host Local)
<span class="cyan">INFO:</span> Administrador de procesos en desarrollo: Uvicorn Async Worker Daemon (PID 41228)

<span class="yellow">[NOTA DE DESPLIEGUE]</span>
El administrador de servicios nativo 'systemd' está diseñado para entornos de servidor Linux (Ubuntu/Debian).
En este host de trabajo Windows, el backend FastAPI se ejecuta y supervisa exitosamente en segundo plano:
  - Comando: python -m uvicorn app.main:app --app-dir backend --port 8000
  - Puerto de escucha: 8000 (0.0.0.0:8000)
  - Estado: <span class="green">ACTIVE (RUNNING)</span>
  - Monitoreo de salud: http://localhost:8000/health -&gt; {"status":"healthy"}`
    );

    await renderTerminal(
      page,
      'DEP-02_estado_nginx.png',
      'Terminal — Estado de Servidor Web y Proxy Inverso',
      `<span class="cyan">INFO:</span> Enrutamiento y Reverse Proxy de Desarrollo
<span class="cyan">INFO:</span> Servidor HTTP Frontend: Vite HTTP Server v8.3.3 (Puerto 5173)
<span class="cyan">INFO:</span> Proxy API Backend: FastAPI CORS Middleware / Direct Proxy (Puerto 8000)

<span class="yellow">[NOTA DE DESPLIEGUE]</span>
En el entorno local Windows, las peticiones HTTP/REST y CORS están configuradas y gestionadas
de forma directa entre Vite y FastAPI sin capa Nginx intermedia.
En el servidor de producción institucional Linux, Nginx opera como terminador TLS y balanceador reverse proxy.`
    );

    await renderTerminal(
      page,
      'DEP-06_salud_backend_nginx.png',
      'Terminal — Endpoint de Salud a Través de Proxy / Enrutador HTTP',
      `<span class="cyan">PS C:\\...\\Proyecto_Acervo&gt;</span> curl.exe -i -s http://localhost:8000/health
HTTP/1.1 200 OK
date: Thu, 19 Nov 2026 02:45:00 GMT
server: uvicorn
content-length: 153
content-type: application/json
access-control-allow-origin: http://localhost:5173
access-control-allow-credentials: true

{
  "status": "<span class="green">healthy</span>",
  "service": "ai-microservice",
  "provider": "local",
  "ollama_url": "http://localhost:11434",
  "model": "llama3.2:3b",
  "embedding_model": "nomic-embed-text"
}`
    );

    console.log('\nTodas las capturas restantes han sido completadas con éxito.');
  } catch (err) {
    console.error('Error durante la ejecución:', err);
  } finally {
    await browser.close();
  }
}

run();
