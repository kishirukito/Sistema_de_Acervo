#!/bin/bash
# Script de setup completo para Sistema de Acervo CIU en el servidor

set -e

echo "============================================="
echo "  SETUP SISTEMA DE ACERVO CIU - SERVIDOR"
echo "============================================="

PROJ_DIR="/home/unipoli_admin/Sistema_de_Acervo"
BACKEND_DIR="$PROJ_DIR/backend"
FRONTEND_DIR="$PROJ_DIR/frontend"
VENV="$BACKEND_DIR/.venv"
SVC_FILE="/etc/systemd/system/acervo-backend.service"
NGINX_CONF="/etc/nginx/sites-available/acervo"

echo ""
echo "[1/6] Verificando entorno virtual Python..."
if [ ! -d "$VENV" ]; then
    python3 -m venv "$VENV"
    echo "    -> Venv creado"
else
    echo "    -> Venv ya existe"
fi

echo ""
echo "[2/6] Instalando dependencias Python..."
"$VENV/bin/pip" install --upgrade pip -q
"$VENV/bin/pip" install -r "$BACKEND_DIR/requirements.txt" -q
echo "    -> Dependencias instaladas"
"$VENV/bin/python" -c "import fastapi; print('    -> FastAPI', fastapi.__version__)"

echo ""
echo "[3/6] Creando servicio systemd del backend..."
LISTEN_ADDR="127.0.0.1"
LISTEN_PORT="8000"

cat > /tmp/acervo-backend.service << SVCEOF
[Unit]
Description=Acervo CIU AI Backend (FastAPI + Uvicorn)
After=network.target

[Service]
Type=simple
User=unipoli_admin
WorkingDirectory=$BACKEND_DIR
ExecStart=$VENV/bin/uvicorn app.main:app --workers 2
Restart=on-failure
RestartSec=5
EnvironmentFile=$BACKEND_DIR/.env
Environment=UVICORN_HOST=$LISTEN_ADDR
Environment=UVICORN_PORT=$LISTEN_PORT

[Install]
WantedBy=multi-user.target
SVCEOF

echo "unipoli123" | sudo -S cp /tmp/acervo-backend.service "$SVC_FILE"
echo "    -> Servicio escrito en $SVC_FILE"

echo ""
echo "[4/6] Habilitando y arrancando el servicio backend..."
echo "unipoli123" | sudo -S systemctl daemon-reload
echo "unipoli123" | sudo -S systemctl enable acervo-backend
echo "unipoli123" | sudo -S systemctl restart acervo-backend
sleep 3
echo "    -> Estado del servicio:"
echo "unipoli123" | sudo -S systemctl status acervo-backend --no-pager -l | grep -E "Active|Main PID|Error" | head -5

echo ""
echo "[5/6] Construyendo el frontend (React + Vite)..."
cd "$FRONTEND_DIR"

# Crear .env.local para produccion si no existe
if [ ! -f "$FRONTEND_DIR/.env.local" ]; then
    cat > "$FRONTEND_DIR/.env.local" << ENVEOF
VITE_AI_API_URL=http://192.168.8.7/api
VITE_SUPABASE_URL=https://ghddarooxlbyjcasbjtx.supabase.co
VITE_SUPABASE_ANON_KEY=
ENVEOF
    echo "    -> .env.local creado"
fi

npm install --silent 2>&1 | tail -3
npm run build 2>&1 | tail -5
echo "    -> Build completado en $FRONTEND_DIR/dist"

echo ""
echo "[6/6] Configurando Nginx..."

# Configurar Nginx: sirve el frontend en / y proxea el backend en /api
cat > /tmp/acervo-nginx << NGINXEOF
server {
    listen 80;
    server_name 192.168.8.7 _;

    root $FRONTEND_DIR/dist;
    index index.html;

    # Frontend SPA - React Router
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Backend API proxy
    location /api/ {
        proxy_pass http://127.0.0.1:8000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
NGINXEOF

echo "unipoli123" | sudo -S cp /tmp/acervo-nginx "$NGINX_CONF"
echo "unipoli123" | sudo -S ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/acervo 2>/dev/null || true
echo "unipoli123" | sudo -S rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true
echo "unipoli123" | sudo -S nginx -t 2>&1
echo "unipoli123" | sudo -S systemctl reload nginx
echo "    -> Nginx configurado"

echo ""
echo "============================================="
echo "  SETUP COMPLETO"
echo "============================================="
echo ""
echo "  Backend:  http://192.168.8.7/api/v1/openapi.json"
echo "  Frontend: http://192.168.8.7"
echo "  Docs API: http://192.168.8.7/api/docs"
echo "  Health:   http://192.168.8.7/api/health"
echo ""
echo "  Modelo AI: llama3.2:1b (Ollama)"
echo "============================================="