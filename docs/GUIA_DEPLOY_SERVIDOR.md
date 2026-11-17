# Guía de Deploy — Sistema de Acervo CIU

Documentación completa del proceso de instalación y configuración del sistema en el servidor de producción.

**Fecha de instalación:** 13 de noviembre de 2026  
**Servidor:** `192.168.8.7` (Ubuntu 24.04.3 LTS — unipoliserver)  
**Usuario:** `unipoli_admin`  
**Repositorio:** `https://github.com/kishirukito/Sistema_de_Acervo.git` (rama `develop`)

---

## Índice

1. [Requisitos del servidor](#1-requisitos-del-servidor)
2. [Software preinstalado verificado](#2-software-preinstalado-verificado)
3. [Conexión SSH al servidor](#3-conexión-ssh-al-servidor)
4. [Clonar el repositorio](#4-clonar-el-repositorio)
5. [Configurar el backend (FastAPI)](#5-configurar-el-backend-fastapi)
6. [Crear el servicio systemd del backend](#6-crear-el-servicio-systemd-del-backend)
7. [Construir el frontend (React + Vite)](#7-construir-el-frontend-react--vite)
8. [Configurar Nginx](#8-configurar-nginx)
9. [Configurar permisos de archivos](#9-configurar-permisos-de-archivos)
10. [Verificación final](#10-verificación-final)
11. [Acceso al sistema](#11-acceso-al-sistema)
12. [Comandos de mantenimiento](#12-comandos-de-mantenimiento)
13. [Solución de problemas conocidos](#13-solución-de-problemas-conocidos)

---

## 1. Requisitos del servidor

| Componente | Mínimo recomendado | Servidor actual |
|---|---|---|
| OS | Ubuntu 22.04+ | Ubuntu 24.04.3 LTS |
| RAM | 4 GB | 15 GB |
| Disco | 20 GB libres | 49 GB libres |
| CPU | 2 núcleos | 2 núcleos |
| Acceso | SSH con sudo | ✅ |
| Internet | Para clonar repo y descargar modelos | ✅ |

---

## 2. Software preinstalado verificado

Antes del deploy se verificó que el servidor ya tenía instalado:

| Software | Versión | Estado |
|---|---|---|
| Python | 3.12.3 | ✅ |
| Node.js | 20.20.2 | ✅ |
| npm | 10.8.2 | ✅ |
| Git | 2.43.0 | ✅ |
| pip3 | 24.0 | ✅ |
| Ollama | 0.40.16 | ✅ activo como servicio |
| Nginx | 1.24.0 | ✅ instalado |

### Modelos Ollama disponibles en el servidor

```
llama3.2:1b          1.3 GB   ← modelo usado por el sistema
llama3.2:3b          2.0 GB
nomic-embed-text     274 MB   ← modelo de embeddings
qwen2.5:0.5b         397 MB
```

> Si alguno de estos no estuviera instalado, descargarlo con:
> ```bash
> ollama pull llama3.2:1b
> ollama pull nomic-embed-text
> ```

---

## 3. Conexión SSH al servidor

Desde Windows con PuTTY/plink instalado:

```powershell
ssh unipoli_admin@192.168.8.7
# Contraseña: unipoli123
```

Para aceptar la clave del host la primera vez:

```powershell
# La fingerprint del servidor es:
# ssh-ed25519 SHA256:ooaRSphGx10VuevRxpNIatgc2VR0rNHImkboqc1Vcqg
```

---

## 4. Clonar el repositorio

```bash
cd ~
git clone -b develop https://github.com/kishirukito/Sistema_de_Acervo.git
cd Sistema_de_Acervo
```

Estructura resultante:

```
~/Sistema_de_Acervo/
├── backend/          # FastAPI + Uvicorn (microservicio IA)
│   ├── app/
│   ├── requirements.txt
│   └── .env          # ← se crea en el paso 5
├── frontend/         # React + Vite
│   ├── src/
│   ├── package.json
│   └── dist/         # ← se genera en el paso 7
└── database/         # Scripts SQL para Supabase
```

---

## 5. Configurar el backend (FastAPI)

### 5.1 Crear el entorno virtual Python

```bash
cd ~/Sistema_de_Acervo/backend
python3 -m venv .venv
```

### 5.2 Instalar dependencias

```bash
.venv/bin/pip install --upgrade pip
.venv/bin/pip install -r requirements.txt
```

Verificar instalación:

```bash
.venv/bin/python -c "import fastapi; print(fastapi.__version__)"
# Debe imprimir: 0.162.7 (o superior)
```

### 5.3 Crear el archivo de variables de entorno

```bash
cat > ~/Sistema_de_Acervo/backend/.env << 'EOF'
PROJECT_NAME=Microservicio de IA - Sistema de Acervo CIU
API_V1_STR=/api/v1
ENVIRONMENT=production
DEBUG=False
AI_PROVIDER=local
OLLAMA_BASE_URL=http://localhost:11434
LOCAL_AI_MODEL=llama3.2:1b
LOCAL_EMBEDDING_MODEL=nomic-embed-text
OLLAMA_KEEP_ALIVE=-1
AI_API_KEY=
SUPABASE_URL=https://ghddarooxlbyjcasbjtx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=TU_SERVICE_ROLE_KEY_AQUI
EOF
```

> **⚠️ Importante:** Reemplaza `TU_SERVICE_ROLE_KEY_AQUI` con la clave real de Supabase.  
> Sin esta clave el login fallará porque el backend no puede consultar la base de datos.
>
> La clave tiene el formato: `sb_secret_xxxxxxxxxxxxxxxxxxxx`  
> Se obtiene en: Supabase Dashboard → Project Settings → API → `service_role` (secret)

---

## 6. Crear el servicio systemd del backend

Este servicio hace que el backend arranque automáticamente con el servidor y se reinicie si falla.

### 6.1 Crear el archivo de servicio

```bash
sudo tee /etc/systemd/system/acervo-backend.service << 'EOF'
[Unit]
Description=Acervo CIU AI Backend (FastAPI + Uvicorn)
After=network.target

[Service]
Type=simple
User=unipoli_admin
WorkingDirectory=/home/unipoli_admin/Sistema_de_Acervo/backend
ExecStart=/home/unipoli_admin/Sistema_de_Acervo/backend/.venv/bin/uvicorn app.main:app --workers 2
Restart=on-failure
RestartSec=5
EnvironmentFile=/home/unipoli_admin/Sistema_de_Acervo/backend/.env
Environment=UVICORN_HOST=127.0.0.1
Environment=UVICORN_PORT=8000

[Install]
WantedBy=multi-user.target
EOF
```

### 6.2 Habilitar y arrancar el servicio

```bash
sudo systemctl daemon-reload
sudo systemctl enable acervo-backend
sudo systemctl start acervo-backend
```

### 6.3 Verificar que esté activo

```bash
systemctl status acervo-backend
# Debe mostrar: Active: active (running)
```

Probar el endpoint de salud directamente:

```bash
curl http://127.0.0.1:8000/health
# Respuesta esperada:
# {"status":"healthy","service":"ai-microservice","provider":"local","ollama_url":"http://localhost:11434","model":"llama3.2:1b","embedding_model":"nomic-embed-text"}
```

---

## 7. Construir el frontend (React + Vite)

### 7.1 Instalar dependencias npm

```bash
cd ~/Sistema_de_Acervo/frontend
npm install
```

### 7.2 Construir para producción

```bash
# Solo Vite (sin verificación de tipos TypeScript, más rápido en servidores)
./node_modules/.bin/vite build
```

> **Nota:** `npm run build` ejecuta `tsc -b && vite build`. El paso de TypeScript puede tardar varios minutos en servidores con poca CPU. Para producción basta con `vite build` directamente.

La salida estará en `~/Sistema_de_Acervo/frontend/dist/`:

```
dist/
├── index.html
├── favicon.svg
├── icons.svg
└── assets/
    ├── index-XXXX.js    (~1.26 MB)
    └── index-XXXX.css   (~296 KB)
```

---

## 8. Configurar Nginx

### 8.1 Crear la configuración del sitio

```bash
sudo tee /etc/nginx/sites-available/acervo << 'EOF'
server {
    listen 80;
    server_name 192.168.8.7 _;

    root /home/unipoli_admin/Sistema_de_Acervo/frontend/dist;
    index index.html;

    access_log /var/log/nginx/acervo_access.log;
    error_log  /var/log/nginx/acervo_error.log;

    # Health check directo al backend
    location = /health {
        proxy_pass http://127.0.0.1:8000/health;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Documentación interactiva del backend
    location /docs {
        proxy_pass http://127.0.0.1:8000/docs;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }

    location /redoc {
        proxy_pass http://127.0.0.1:8000/redoc;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }

    # OpenAPI JSON
    location /api/v1/openapi.json {
        proxy_pass http://127.0.0.1:8000/api/v1/openapi.json;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }

    # Backend API proxy
    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass_request_headers on;
        proxy_pass_request_body on;
        proxy_read_timeout 300s;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_buffering off;
        proxy_request_buffering off;
    }

    # Frontend SPA - React Router
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF
```

### 8.2 Activar el sitio y deshabilitar el default

```bash
sudo ln -sf /etc/nginx/sites-available/acervo /etc/nginx/sites-enabled/acervo
sudo rm -f /etc/nginx/sites-enabled/default
```

### 8.3 Verificar configuración y recargar

```bash
sudo nginx -t
# Debe mostrar: configuration file test is successful

sudo systemctl reload nginx
```

---

## 9. Configurar permisos de archivos

Nginx corre como usuario `www-data` y necesita poder leer los archivos del `dist`. El directorio home de `unipoli_admin` por defecto no es accesible para otros usuarios.

```bash
# Dar permiso de ejecución (traversal) en los directorios del path
chmod o+x /home/unipoli_admin
chmod o+x /home/unipoli_admin/Sistema_de_Acervo
chmod o+x /home/unipoli_admin/Sistema_de_Acervo/frontend

# Dar permiso de lectura y ejecución a todos los archivos del dist
chmod -R o+r /home/unipoli_admin/Sistema_de_Acervo/frontend/dist
chmod -R o+x /home/unipoli_admin/Sistema_de_Acervo/frontend/dist
```

> **¿Por qué?** Sin esto Nginx devuelve HTTP 500 con el error `Permission denied (13)` en los logs.

---

## 10. Verificación final

Ejecutar desde dentro del servidor:

```bash
# Estado de los 3 servicios
systemctl is-active acervo-backend   # → active
systemctl is-active nginx            # → active
systemctl is-active ollama           # → active

# Frontend accesible
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1/
# → 200

# Health check del backend vía Nginx
curl -s http://127.0.0.1/health
# → {"status":"healthy","model":"llama3.2:1b",...}

# Prueba de login (admin)
python3 - << 'PYEOF'
import urllib.request, json
data = json.dumps({"email": "admin@upd.edu.mx", "password": "admin123"}).encode()
req = urllib.request.Request("http://127.0.0.1:8000/api/v1/auth/login",
      data=data, headers={"Content-Type": "application/json"}, method="POST")
with urllib.request.urlopen(req) as r:
    d = json.loads(r.read())
    print(f"Login OK: {d['user']['name']} → {d['redirectUrl']}")
PYEOF
# → Login OK: Administrador General → /admin/dashboard
```

---

## 11. Acceso al sistema

| Recurso | URL |
|---|---|
| **Aplicación web** | http://192.168.8.7 |
| **Health check** | http://192.168.8.7/health |
| **Documentación API (Swagger)** | http://192.168.8.7/docs |
| **Documentación API (ReDoc)** | http://192.168.8.7/redoc |
| **API v1** | http://192.168.8.7/api/v1/ |

> **Acceso de red:** Solo disponible desde la misma red LAN (192.168.8.x).  
> Para acceso externo desde internet se requiere configurar port forwarding en el router o usar Cloudflare Tunnel.

---

## 12. Comandos de mantenimiento

### Reiniciar el backend

```bash
sudo systemctl restart acervo-backend
```

### Ver logs del backend en tiempo real

```bash
sudo journalctl -u acervo-backend -f
```

### Ver logs de Nginx

```bash
sudo tail -f /var/log/nginx/acervo_access.log
sudo tail -f /var/log/nginx/acervo_error.log
```

### Actualizar el sistema (nuevo código desde GitHub)

```bash
cd ~/Sistema_de_Acervo

# 1. Descargar cambios
git pull origin develop

# 2. Actualizar dependencias Python si cambiaron
.venv/bin/pip install -r backend/requirements.txt

# 3. Reconstruir el frontend
cd frontend && ./node_modules/.bin/vite build && cd ..

# 4. Volver a aplicar permisos del dist
chmod -R o+r frontend/dist
chmod -R o+x frontend/dist

# 5. Reiniciar el backend
sudo systemctl restart acervo-backend
sudo systemctl reload nginx
```

### Cambiar el modelo de IA

Editar `~/Sistema_de_Acervo/backend/.env`:

```bash
nano ~/Sistema_de_Acervo/backend/.env
# Cambiar LOCAL_AI_MODEL=llama3.2:1b por el modelo deseado
```

Luego reiniciar:

```bash
sudo systemctl restart acervo-backend
```

Modelos disponibles en el servidor: `llama3.2:1b`, `llama3.2:3b`, `qwen2.5:0.5b`, `nomic-embed-text`

### Ver modelos Ollama disponibles

```bash
ollama list
```

---

## 13. Solución de problemas conocidos

### El frontend da HTTP 500

**Causa:** Nginx no tiene permisos para leer el directorio `dist`.  
**Solución:**
```bash
chmod o+x /home/unipoli_admin
chmod o+x /home/unipoli_admin/Sistema_de_Acervo
chmod o+x /home/unipoli_admin/Sistema_de_Acervo/frontend
chmod -R o+r /home/unipoli_admin/Sistema_de_Acervo/frontend/dist
chmod -R o+x /home/unipoli_admin/Sistema_de_Acervo/frontend/dist
```

### El login devuelve "Error de conexión con la base de datos"

**Causa:** `SUPABASE_SERVICE_ROLE_KEY` está vacía o incorrecta en el `.env` del backend.  
**Solución:** Verificar y actualizar el `.env`:
```bash
nano ~/Sistema_de_Acervo/backend/.env
# Asegurarse que SUPABASE_SERVICE_ROLE_KEY tenga el valor correcto
sudo systemctl restart acervo-backend
```

### El body JSON no llega al backend (FastAPI recibe body vacío)

**Causa:** Configuración de Nginx con buffering activado que corrompe el body.  
**Solución:** Asegurarse de que la config de Nginx tenga en el bloque `location /api/`:
```nginx
proxy_pass_request_headers on;
proxy_pass_request_body on;
proxy_buffering off;
proxy_request_buffering off;
```

### El servicio backend no arranca

```bash
# Ver el error exacto
sudo journalctl -u acervo-backend -n 50 --no-pager

# Causas comunes:
# - Puerto 8000 ya en uso: lsof -i :8000
# - Error en el .env: revisar sintaxis
# - Dependencias faltantes: .venv/bin/pip install -r requirements.txt
```

### `npm run build` tarda demasiado o se cuelga

**Causa:** `tsc -b` (verificación de tipos TypeScript) consume mucha CPU en servidores lentos.  
**Solución:** Usar solo Vite sin TypeScript:
```bash
./node_modules/.bin/vite build
```

---

## Arquitectura del sistema en el servidor

```
Internet/LAN
     │
     ▼
┌─────────────────────────────────────────┐
│  SERVIDOR 192.168.8.7 (Ubuntu 24.04)   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Nginx :80                      │   │
│  │  ├── /          → dist/ (React) │   │
│  │  ├── /api/v1/   → :8000 (proxy) │   │
│  │  ├── /health    → :8000 (proxy) │   │
│  │  └── /docs      → :8000 (proxy) │   │
│  └─────────────────────────────────┘   │
│                │                        │
│                ▼                        │
│  ┌─────────────────────────────────┐   │
│  │  FastAPI/Uvicorn :8000          │   │
│  │  (acervo-backend.service)       │   │
│  │  ├── POST /api/v1/auth/login    │   │
│  │  ├── POST /api/v1/ai/resumen    │   │
│  │  └── POST /api/v1/ai/embeddings │   │
│  └─────────────────────────────────┘   │
│                │                        │
│       ┌────────┴────────┐              │
│       ▼                 ▼              │
│  ┌─────────┐    ┌──────────────┐      │
│  │ Ollama  │    │   Supabase   │      │
│  │ :11434  │    │  (internet)  │      │
│  │llama3.2:│    │  PostgreSQL  │      │
│  │  1b     │    │  + Auth      │      │
│  └─────────┘    └──────────────┘      │
└─────────────────────────────────────────┘
```

---

*Documentación generada el 13 de noviembre de 2026.*  
*Sistema de Acervo CIU — Universidad.*
