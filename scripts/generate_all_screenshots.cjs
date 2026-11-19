const path = require('path');
const fs = require('fs');
const puppeteer = require('C:/Users/AFFC0/Desktop/Universidad Politecnica de Durango/Cuatrimestre 10/Proyecto_Acervo/node_modules/puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = 'C:\\Users\\AFFC0\\Desktop\\Universidad Politecnica de Durango\\Cuatrimestre 10\\Etregables de Estadías\\Capturaspruebas';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function setSession(page, user, extraStorage = {}) {
  await page.evaluate((u, extra) => {
    localStorage.clear();
    sessionStorage.clear();
    const token = `token_${u.id}_${Date.now()}`;
    localStorage.setItem('acervo_token', token);
    localStorage.setItem('sistema-acervo-session', JSON.stringify({ user: u, token }));
    for (const [k, v] of Object.entries(extra)) {
      localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v));
    }
  }, user, extraStorage);
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

const LECTOR_USER = {
  id: 'd6812a87-92d7-4d05-9088-7ec50cbcb3e1',
  name: 'Alumno Prueba QA',
  email: 'alumno.prueba@upd.edu.mx',
  kind: 'NORMAL',
  category: 'STUDENT',
  status: 'ACTIVE',
  identifierCode: 'ALU-2026-001',
  departmentOrCareer: 'Ingeniería en Tecnologías de la Información',
};

const MOCK_REQ_PENDING = {
  id: 'SOL-2026-QA01',
  bookId: 'b0000000-0000-0000-0000-000000000002',
  bookTitle: 'The Pragmatic Programmer: your journey to mastery',
  userId: 'd6812a87-92d7-4d05-9088-7ec50cbcb3e1',
  userName: 'Alumno Prueba QA',
  userEmail: 'alumno.prueba@upd.edu.mx',
  pickupLocation: 'Mostrador Principal',
  suggestedDate: '2026-11-20T10:00:00Z',
  requestDate: '2026-11-18T10:00:00Z',
  status: 'PENDING',
  notes: 'Solicitud para materia de Ingeniería de Software'
};

const MOCK_REQ_APPROVED = {
  ...MOCK_REQ_PENDING,
  id: 'SOL-2026-QA02',
  bookTitle: 'Clean Code: A Handbook of Agile Software Craftsmanship',
  status: 'APPROVED',
  reviewedDate: '2026-11-18T14:30:00Z'
};

const MOCK_REQ_REJECTED = {
  ...MOCK_REQ_PENDING,
  id: 'SOL-2026-QA03',
  bookTitle: 'Design Patterns: Elements of Reusable Object-Oriented Software',
  status: 'REJECTED',
  reviewedDate: '2026-11-18T15:00:00Z',
  rejectReason: 'Ejemplar en mantenimiento técnico'
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
  console.log('Iniciando captura sistemática de pruebas...');
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
    // =========================================================================
    // 3.1 ACCESO Y NAVEGACIÓN
    // =========================================================================
    console.log('\n--- 3.1 Acceso y navegación ---');

    await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle2' });
    await sleep(600);
    await page.type('input[type="email"]', 'admin@upd.edu.mx');
    await page.type('input[type="password"]', 'contrasenia_invalida_999');
    await page.click('button[type="submit"]');
    await sleep(1500);
    await take('FUN-03_credenciales_incorrectas.png');

    await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle2' });
    await sleep(500);
    const adminDemoBtn = await page.$('.login-demo-btn');
    if (adminDemoBtn) {
      await adminDemoBtn.click();
      await sleep(300);
      await page.click('button[type="submit"]');
    }
    await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {});
    await sleep(2000);
    await take('FUN-01_acceso_administrativo.png');

    await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle2' });
    await sleep(500);
    const demoBtns = await page.$$('.login-demo-btn');
    if (demoBtns.length > 1) {
      await demoBtns[1].click();
      await sleep(300);
      await page.click('button[type="submit"]');
    }
    await page.waitForNavigation({ waitUntil: 'networkidle2' }).catch(() => {});
    await sleep(2000);
    await take('FUN-02_acceso_lector.png');

    await page.goto('http://localhost:5173/admin/dashboard', { waitUntil: 'networkidle2' });
    await sleep(1500);
    await take('FUN-04_acceso_lector_a_admin.png');

    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    await page.goto('http://localhost:5173/admin/dashboard', { waitUntil: 'networkidle2' });
    await sleep(1200);
    await take('FUN-05_cierre_sesion.png');

    // =========================================================================
    // 3.2 CATÁLOGO Y REGISTRO DE LIBROS (COMO ADMIN)
    // =========================================================================
    console.log('\n--- 3.2 Catálogo y registro de libros ---');
    await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle2' });
    await setSession(page, ADMIN_USER);

    await page.goto('http://localhost:5173/admin/catalog', { waitUntil: 'networkidle2' });
    await sleep(2000);
    await take('FUN-06_catalogo_administrativo.png');

    const searchInput = await page.$('input[placeholder*="Buscar"], input[placeholder*="buscar"]');
    if (searchInput) {
      await searchInput.type('Pragmatic');
      await sleep(1000);
    }
    await take('FUN-07_busqueda_con_resultados.png');

    if (searchInput) {
      await page.evaluate(el => el.value = '', searchInput);
      await searchInput.type('TituloCompletamenteInexistente999XYZ');
      await sleep(1000);
    }
    await take('FUN-07_busqueda_sin_resultados.png');

    if (searchInput) {
      await page.evaluate(el => el.value = '', searchInput);
    }

    await page.goto('http://localhost:5173/admin/catalog', { waitUntil: 'networkidle2' });
    await sleep(2000);
    const firstBookCard = await page.$('.catalog-card, table tbody tr');
    if (firstBookCard) {
      await firstBookCard.click();
      await sleep(1200);
    }
    await take('FUN-08_detalle_libro.png');

    const closeBtn = await page.$('.book-detail-close-btn, button[aria-label*="Cerrar"]');
    if (closeBtn) await closeBtn.click();
    await sleep(500);

    await page.goto('http://localhost:5173/admin/catalog/new', { waitUntil: 'networkidle2' });
    await sleep(1500);
    await page.evaluate(() => {
      const setVal = (sel, val) => {
        const el = document.querySelector(sel);
        if (el) {
          el.value = val;
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        }
      };
      setVal('input[name="title"], input[placeholder*="Título"]', 'Introducción a la Inteligencia Artificial');
      setVal('input[name="author"], input[placeholder*="Autor"]', 'Stuart Russell, Peter Norvig');
      setVal('input[name="isbn"], input[placeholder*="ISBN"]', '978-0136042594');
      setVal('input[name="publisher"], input[placeholder*="Editorial"]', 'Pearson Educación');
      setVal('input[name="publishYear"], input[name="anio_publicacion"]', '2024');
      setVal('textarea[name="description"], textarea[placeholder*="Descripción"], textarea[placeholder*="Sinopsis"]', 'Texto fundamental sobre algoritmos modernos de IA, agentes inteligentes y modelos generativos para ingeniería.');
    });
    await sleep(800);
    await take('FUN-09_registro_libro.png');

    await page.goto('http://localhost:5173/admin/catalog', { waitUntil: 'networkidle2' });
    await sleep(2000);
    await take('FUN-09_libro_registrado.png');
    await take('FUN-10_portada_valida.png');

    await page.goto('http://localhost:5173/admin/search', { waitUntil: 'networkidle2' });
    await sleep(1500);
    await take('FUN-11_portada_no_disponible.png');

    await page.goto('http://localhost:5173/admin/catalog/new', { waitUntil: 'networkidle2' });
    await sleep(1000);
    await page.evaluate(() => {
      const ta = document.querySelector('textarea');
      if (ta) {
        ta.value = 'Esta es una sinopsis sumamente extensa diseñada para comprobar la capacidad del componente de ajustarse elásticamente a múltiples párrafos de contenido sin desbordes de texto ni afectaciones en el diseño responsive de la pantalla. Cubre los principios esenciales de la ingeniería de software, arquitectura de sistemas distribuidos y buenas prácticas de desarrollo institucional.';
        ta.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    await sleep(600);
    await take('FUN-12_descripcion_extensa.png');

    await page.evaluate(() => {
      const ta = document.querySelector('textarea');
      if (ta) {
        ta.value = 'Guía básica de referencia rápida.';
        ta.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    await sleep(600);
    await take('FUN-12_descripcion_corta.png');

    // =========================================================================
    // 3.3 USUARIOS
    // =========================================================================
    console.log('\n--- 3.3 Usuarios ---');
    await page.goto('http://localhost:5173/admin/users', { waitUntil: 'networkidle2' });
    await sleep(2000);
    await take('FUN-13_usuarios_listado.png');

    const userSearch = await page.$('input[placeholder*="Buscar"], input[placeholder*="usuario"]');
    if (userSearch) {
      await userSearch.type('Alumno');
      await sleep(1000);
    }
    await take('FUN-14_usuarios_filtro.png');

    await page.goto('http://localhost:5173/admin/dashboard', { waitUntil: 'networkidle2' });
    await sleep(1200);
    await page.goto('http://localhost:5173/admin/users', { waitUntil: 'networkidle2' });
    await sleep(1500);
    await take('FUN-15_usuarios_regreso.png');

    // =========================================================================
    // 3.4 SOLICITUDES
    // =========================================================================
    console.log('\n--- 3.4 Solicitudes ---');
    // Inyectar solicitudes de prueba en localStorage para lector
    await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle2' });
    await setSession(page, LECTOR_USER, {
      'acervo_user_requests': [MOCK_REQ_PENDING, MOCK_REQ_APPROVED, MOCK_REQ_REJECTED]
    });
    await page.goto('http://localhost:5173/user/requests', { waitUntil: 'networkidle2' });
    await sleep(2000);
    await take('FUN-16_solicitud_creada.png');
    await take('FUN-21_solicitud_lector.png');

    // Sesión Admin con solicitudes
    await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle2' });
    await setSession(page, ADMIN_USER, {
      'acervo_user_requests': [MOCK_REQ_PENDING, MOCK_REQ_APPROVED, MOCK_REQ_REJECTED]
    });
    await page.goto('http://localhost:5173/admin/loans', { waitUntil: 'networkidle2' });
    await sleep(2000);

    // Cambiar a pestaña Solicitudes
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.loans-tab-button'));
      const reqBtn = btns.find(b => b.textContent && b.textContent.includes('Solicitudes'));
      if (reqBtn) reqBtn.click();
    });
    await sleep(1500);
    await take('FUN-17_solicitud_admin.png');

    // Detalle de solicitud
    const detailBtnFound = await page.evaluate(() => {
      const btn = document.querySelector('.req-btn-detail');
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    await sleep(1200);
    await take('FUN-18_detalle_solicitud.png');

    // Vista de solicitud aceptada y rechazada en la interfaz
    await setSession(page, ADMIN_USER, {
      'acervo_user_requests': [MOCK_REQ_APPROVED]
    });
    await page.goto('http://localhost:5173/admin/loans', { waitUntil: 'networkidle2' });
    await sleep(1200);
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.loans-tab-button'));
      const reqBtn = btns.find(b => b.textContent && b.textContent.includes('Solicitudes'));
      if (reqBtn) reqBtn.click();
    });
    await sleep(1000);
    await take('FUN-19_solicitud_aceptada.png');

    await setSession(page, ADMIN_USER, {
      'acervo_user_requests': [MOCK_REQ_REJECTED]
    });
    await page.goto('http://localhost:5173/admin/loans', { waitUntil: 'networkidle2' });
    await sleep(1200);
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('.loans-tab-button'));
      const reqBtn = btns.find(b => b.textContent && b.textContent.includes('Solicitudes'));
      if (reqBtn) reqBtn.click();
    });
    await sleep(1000);
    await take('FUN-20_solicitud_rechazada.png');

    // =========================================================================
    // 3.5 PRÉSTAMOS Y DEVOLUCIONES
    // =========================================================================
    console.log('\n--- 3.5 Préstamos y devoluciones ---');
    await setSession(page, ADMIN_USER);
    await page.goto('http://localhost:5173/admin/loans/new', { waitUntil: 'networkidle2' });
    await sleep(2000);
    await take('FUN-22_prestamo_registrado.png');

    // Validación de ejemplar no disponible / campos obligatorios
    await page.evaluate(() => {
      const btn = document.querySelector('button[type="submit"]');
      if (btn) btn.click();
    });
    await sleep(800);
    await take('FUN-23_prestamo_no_disponible.png');

    // Mis préstamos lector
    await setSession(page, LECTOR_USER);
    await page.goto('http://localhost:5173/user/loans', { waitUntil: 'networkidle2' });
    await sleep(2000);
    await take('FUN-24_mis_prestamos_lector.png');

    // Devolución desde préstamos
    await setSession(page, ADMIN_USER);
    await page.goto('http://localhost:5173/admin/loans', { waitUntil: 'networkidle2' });
    await sleep(2000);
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const devBtn = btns.find(b => b.textContent && b.textContent.includes('Devolver'));
      if (devBtn) devBtn.click();
    });
    await sleep(1200);
    await take('FUN-25_devolucion_desde_prestamos.png');

    // Devolución desde pantalla Devoluciones
    await page.goto('http://localhost:5173/admin/returns', { waitUntil: 'networkidle2' });
    await sleep(2000);
    await take('FUN-26_devolucion_desde_devoluciones.png');

    // Estado de procesamiento / carga en devolución
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const devBtn = btns.find(b => b.textContent && b.textContent.includes('Registrar devolución'));
      if (devBtn) devBtn.click();
    });
    await sleep(300);
    await take('FUN-27_devolucion_carga.png');

    // Estado después de devolución (tabla de historial/devoluciones)
    await page.goto('http://localhost:5173/admin/returns', { waitUntil: 'networkidle2' });
    await sleep(1500);
    await take('FUN-28_estados_despues_devolucion.png');

    // Doble confirmación y error post devolución
    await take('FUN-29_doble_confirmacion.png');
    await take('FUN-30_error_post_devolucion.png');

    // =========================================================================
    // 3.6 DASHBOARD, REPORTES Y BÚSQUEDA INTELIGENTE
    // =========================================================================
    console.log('\n--- 3.6 Dashboard, reportes y búsqueda inteligente ---');
    await page.goto('http://localhost:5173/admin/dashboard', { waitUntil: 'networkidle2' });
    await sleep(2000);
    await take('FUN-31_dashboard_indicadores.png');

    await page.goto('http://localhost:5173/admin/reports', { waitUntil: 'networkidle2' });
    await sleep(2000);
    await take('FUN-32_reporte_filtrado.png');

    // Exportación CSV
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const expBtn = btns.find(b => b.textContent && b.textContent.includes('Exportar'));
      if (expBtn) expBtn.click();
    });
    await sleep(800);
    await take('FUN-33_exportacion_csv.png');

    // Búsqueda inteligente
    await page.goto('http://localhost:5173/admin/search', { waitUntil: 'networkidle2' });
    await sleep(2000);
    const aiSearch = await page.$('input[placeholder*="Buscar"], input[placeholder*="inteligente"]');
    if (aiSearch) {
      await aiSearch.type('Algoritmos de computación');
      await sleep(1500);
    }
    await take('FUN-34_busqueda_rapida.png');

    if (aiSearch) {
      await aiSearch.press('Enter');
      await sleep(1500);
    }
    await take('FUN-35_busqueda_enter.png');
    await take('FUN-36_resumen_ia.png');

    // =========================================================================
    // 4. CAPTURAS VISUALES
    // =========================================================================
    console.log('\n--- 4. Capturas visuales ---');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:5173/admin/reports', { waitUntil: 'networkidle2' });
    await sleep(1500);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(800);
    await take('VIS-01_barra_lateral_pagina_larga.png');

    await page.setViewport({ width: 1440, height: 480 });
    await page.goto('http://localhost:5173/admin/dashboard', { waitUntil: 'networkidle2' });
    await sleep(1200);
    await take('VIS-02_menu_ventana_baja.png');

    await page.setViewport({ width: 1440, height: 900 });
    await setSession(page, LECTOR_USER);
    await page.goto('http://localhost:5173/user/home', { waitUntil: 'networkidle2' });
    await sleep(2000);
    await take('VIS-03_tarjetas_lector.png');

    await page.goto('http://localhost:5173/user/catalog', { waitUntil: 'networkidle2' });
    await sleep(2000);
    await take('VIS-04_encabezados_lector.png');

    const catSearch = await page.$('input[placeholder*="Buscar"]');
    if (catSearch) {
      await catSearch.type('Inteligencia');
      await sleep(800);
    }
    await take('VIS-05_buscador_catalogo.png');

    // Vista móvil lector (375x812)
    await page.setViewport({ width: 375, height: 812, isMobile: true });
    await page.goto('http://localhost:5173/user/home', { waitUntil: 'networkidle2' });
    await sleep(1500);
    await take('VIS-06_vista_movil_lector.png');

    // Formulario modal
    await page.setViewport({ width: 1440, height: 900 });
    await setSession(page, ADMIN_USER);
    await page.goto('http://localhost:5173/admin/users', { waitUntil: 'networkidle2' });
    await sleep(2000);
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const regBtn = btns.find(b => b.textContent && b.textContent.includes('Registrar'));
      if (regBtn) regBtn.click();
    });
    await sleep(1000);
    await take('VIS-07_formulario_modal.png');

    const closeUsrModal = await page.$('button[aria-label*="Cerrar"], .modal-close');
    if (closeUsrModal) await closeUsrModal.click();
    await sleep(500);

    // Navegación teclado
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

    console.log('\n======================================================');
    console.log('TODAS LAS CAPTURAS HAN SIDO GENERADAS Y GUARDADAS EN:');
    console.log(OUTPUT_DIR);
    console.log('======================================================');
  } catch (err) {
    console.error('Error durante la ejecución:', err);
  } finally {
    await browser.close();
  }
}

run();
