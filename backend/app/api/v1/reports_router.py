from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import httpx
import asyncio
from app.core.config import settings
from typing import Dict, Any, List, Optional
from datetime import datetime, timezone

router = APIRouter(prefix="/reports", tags=["Estadísticas SIABUC"])

DEWEY_LABELS = {
    "000": "000 Obras Generales y Computación",
    "100": "100 Filosofía y Psicología",
    "200": "200 Religión",
    "300": "300 Ciencias Sociales",
    "400": "400 Lenguas",
    "500": "500 Ciencias Puras",
    "600": "600 Tecnología y Ciencias Aplicadas",
    "700": "700 Artes y Recreación",
    "800": "800 Literatura",
    "900": "900 Historia y Geografía",
    "Otro": "Otras Clasificaciones"
}

def get_dewey_group(dewey_str: str | None) -> str:
    if not dewey_str:
        return "Otro"
    clean = dewey_str.strip()
    if clean and clean[0].isdigit():
        hundred = clean[0] + "00"
        return DEWEY_LABELS.get(hundred, "Otro")
    return "Otro"

# Modelos de entrada para captura de nuevos datos en los reportes
class CreateSancionPayload(BaseModel):
    usuario_id: str
    tipo_sancion: str  # 'multa', 'amonestacion', 'suspension'
    monto_multa: float = 0.0
    estado_pago: str = "pendiente"  # 'pendiente', 'pagado', 'condonado'
    motivo: str

class CreateReservaEspacioPayload(BaseModel):
    usuario_id: str
    espacio_id: int
    inicio: str
    fin: str
    estado: str = "concluida"

class CreateSesionComputoPayload(BaseModel):
    usuario_id: str
    equipo_id: int
    duracion_minutos: int = 60

class UpdateEjemplarEstadoPayload(BaseModel):
    ejemplar_id: str
    estado: str  # 'disponible', 'prestado', 'mantenimiento', 'extraviado', 'baja'
    observaciones: Optional[str] = None


@router.get("/siabuc")
async def get_siabuc_statistics() -> Dict[str, Any]:
    """
    Retorna los 4 bloques estadísticos estándar de SIABUC con datos reales de Supabase
    más el bloque de Resumen Ejecutivo con detección dinámica de préstamos vencidos por fecha.
    """
    headers = {
        "apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}"
    }

    async with httpx.AsyncClient() as client:
        # Sincronizar automáticamente préstamos vencidos en Supabase cuya fecha límite haya expirado
        try:
            now_iso_utc = datetime.now(timezone.utc).isoformat()
            await client.patch(
                f"{settings.SUPABASE_URL}/rest/v1/prestamos?estado=eq.activo&fecha_limite_devolucion=lte.{now_iso_utc}&fecha_devolucion_real=is.null",
                json={"estado": "vencido"},
                headers=headers
            )
        except Exception as e:
            print("Auto-update overdue loans notice:", e)

        reqs = [
            client.get(
                f"{settings.SUPABASE_URL}/rest/v1/prestamos?select=*,usuarios(nombre_completo,email,carrera_o_dependencia,tipo_usuario_id,tipos_usuario(nombre)),ejemplares(id,estado,codigo_inventario,libros(id,titulo,clasificacion_dewey))&order=fecha_prestamo.desc",
                headers=headers
            ),
            client.get(f"{settings.SUPABASE_URL}/rest/v1/sanciones_multas?select=*,usuarios(nombre_completo,email)&order=created_at.desc", headers=headers),
            client.get(f"{settings.SUPABASE_URL}/rest/v1/libros?select=id,titulo,anio_publicacion,creado_por_id,clasificacion_dewey,created_at,usuarios:usuarios!libros_creado_por_id_fkey(nombre_completo)&order=created_at.desc", headers=headers),
            client.get(f"{settings.SUPABASE_URL}/rest/v1/ejemplares?select=id,libro_id,codigo_inventario,estado,ubicacion_estante,observaciones,created_at", headers=headers),
            client.get(f"{settings.SUPABASE_URL}/rest/v1/espacios_biblioteca?select=*&order=id.asc", headers=headers),
            client.get(f"{settings.SUPABASE_URL}/rest/v1/reservas_espacios?select=*,espacios_biblioteca(nombre,tipo),usuarios(nombre_completo)&order=created_at.desc", headers=headers),
            client.get(f"{settings.SUPABASE_URL}/rest/v1/equipos_computo?select=*&order=id.asc", headers=headers),
            client.get(f"{settings.SUPABASE_URL}/rest/v1/sesiones_computo?select=*,equipos_computo(codigo),usuarios(nombre_completo)&order=created_at.desc", headers=headers),
            client.get(f"{settings.SUPABASE_URL}/rest/v1/usuarios?select=id,nombre_completo,email&order=nombre_completo.asc", headers=headers)
        ]
        
        responses = await asyncio.gather(*reqs)
        
        prestamos = responses[0].json() if responses[0].status_code == 200 else []
        sanciones = responses[1].json() if responses[1].status_code == 200 else []
        libros = responses[2].json() if responses[2].status_code == 200 else []
        ejemplares = responses[3].json() if responses[3].status_code == 200 else []
        espacios = responses[4].json() if responses[4].status_code == 200 else []
        reservas = responses[5].json() if responses[5].status_code == 200 else []
        equipos = responses[6].json() if responses[6].status_code == 200 else []
        sesiones_computo = responses[7].json() if responses[7].status_code == 200 else []
        usuarios = responses[8].json() if responses[8].status_code == 200 else []

    # 1. BLOQUE: CIRCULACIÓN & EVALUACIÓN DINÁMICA DE ESTADOS
    prestamos_por_tipo = {}
    prestamos_por_carrera = {}
    frecuencia_libros = {}
    renovaciones_totales = 0
    prestamos_sala = 0
    prestamos_domicilio = 0
    activos_count = 0
    devueltos_count = 0
    vencidos_count = 0

    now_ref = datetime.now(timezone.utc)

    for p in prestamos:
        # Evaluar estado dinámicamente si la fecha límite ya venció
        devuelto = p.get("estado") == "devuelto" or bool(p.get("fecha_devolucion_real"))
        due_iso = p.get("fecha_limite_devolucion")
        es_vencido = p.get("estado") == "vencido"
        dias_retraso = 0

        if not devuelto and due_iso:
            try:
                due_dt = datetime.fromisoformat(due_iso.replace("Z", "+00:00"))
                # Si due_dt no tiene tzinfo, asignamos utc
                if due_dt.tzinfo is None:
                    due_dt = due_dt.replace(tzinfo=timezone.utc)
                if now_ref >= due_dt:
                    es_vencido = True
                    diff_seconds = (now_ref - due_dt).total_seconds()
                    dias_retraso = max(0, int(diff_seconds // 86400))
            except Exception:
                pass

        if devuelto:
            devueltos_count += 1
            p["_estado_calculado"] = "devuelto"
        elif es_vencido:
            vencidos_count += 1
            p["_estado_calculado"] = "vencido"
            p["_dias_retraso"] = dias_retraso
        else:
            activos_count += 1
            p["_estado_calculado"] = "activo"

        # Tipo de usuario
        t_nombre = (p.get("usuarios") or {}).get("tipos_usuario", {}).get("nombre") if isinstance(p.get("usuarios"), dict) else None
        t_nombre = t_nombre or "Estudiante / Lector Regular"
        prestamos_por_tipo[t_nombre] = prestamos_por_tipo.get(t_nombre, 0) + 1

        # Carrera o dependencia
        carrera = (p.get("usuarios") or {}).get("carrera_o_dependencia") if isinstance(p.get("usuarios"), dict) else None
        carrera = carrera or "Ingeniería en Sistemas Computacionales"
        prestamos_por_carrera[carrera] = prestamos_por_carrera.get(carrera, 0) + 1

        # Modalidad y renovaciones
        if p.get("tipo_prestamo") == "sala":
            prestamos_sala += 1
        else:
            prestamos_domicilio += 1
        renovaciones_totales += (p.get("renovaciones_count") or 0)

        # Frecuencia de uso del acervo
        ej = p.get("ejemplares") or {}
        lb = ej.get("libros") or {} if isinstance(ej, dict) else {}
        titulo = lb.get("titulo") if isinstance(lb, dict) else None
        if not titulo:
            titulo = f"Material Ejemplar #{p.get('ejemplar_id', 'N/A')}"
        frecuencia_libros[titulo] = frecuencia_libros.get(titulo, 0) + 1

    # Ordenar libros más solicitados
    ranking_acervo = sorted(
        [{"titulo": k, "solicitudes": v} for k, v in frecuencia_libros.items()],
        key=lambda x: x["solicitudes"],
        reverse=True
    )[:10]

    # Sanciones y Multas
    total_multas_monto = sum(float(s.get("monto_multa") or 0) for s in sanciones)
    multas_pendientes_monto = sum(float(s.get("monto_multa") or 0) for s in sanciones if s.get("estado_pago") == "pendiente")
    multas_recaudadas_monto = sum(float(s.get("monto_multa") or 0) for s in sanciones if s.get("estado_pago") == "pagado")
    usuarios_sancionados_count = len(set(s.get("usuario_id") for s in sanciones if s.get("usuario_id")))
    
    sanciones_por_tipo = {}
    for s in sanciones:
        st = s.get("tipo_sancion") or "multa"
        sanciones_por_tipo[st] = sanciones_por_tipo.get(st, 0) + 1

    # 2. BLOQUE: PROCESOS TÉCNICOS (Catalogación y Altas)
    catalogadores = {}
    altas_por_anio = {}
    for l in libros:
        u_info = l.get("usuarios")
        cat_nombre = u_info.get("nombre_completo") if isinstance(u_info, dict) else None
        cat_nombre = cat_nombre or "Administrador General"
        catalogadores[cat_nombre] = catalogadores.get(cat_nombre, 0) + 1

        created = l.get("created_at")
        anio = "2026"
        if created:
            try:
                anio = str(datetime.fromisoformat(created.replace("Z", "+00:00")).year)
            except Exception:
                anio = "2026"
        altas_por_anio[anio] = altas_por_anio.get(anio, 0) + 1

    # 3. BLOQUE: INVENTARIO Y EXISTENCIAS
    ejemplares_estados = {}
    for ej in ejemplares:
        est = ej.get("estado") or "disponible"
        ejemplares_estados[est] = ejemplares_estados.get(est, 0) + 1

    dewey_counts = {v: 0 for v in DEWEY_LABELS.values()}
    for l in libros:
        dewey_grp = get_dewey_group(l.get("clasificacion_dewey"))
        dewey_counts[dewey_grp] = dewey_counts.get(dewey_grp, 0) + 1

    dewey_stats = [{"clasificacion": k, "cantidad": v} for k, v in dewey_counts.items() if v > 0]
    if not dewey_stats:
        dewey_stats = [{"clasificacion": "000 Obras Generales y Computación", "cantidad": len(libros)}]

    # 4. BLOQUE: SERVICIOS BIBLIOTECARIOS
    espacios_uso = {}
    for r in reservas:
        esp_nombre = (r.get("espacios_biblioteca") or {}).get("nombre") if isinstance(r.get("espacios_biblioteca"), dict) else "Cubículo / Sala"
        esp_nombre = esp_nombre or "Sala de Estudio"
        espacios_uso[esp_nombre] = espacios_uso.get(esp_nombre, 0) + 1

    minutos_computo = sum(int(sc.get("duracion_minutos") or 0) for sc in sesiones_computo)

    # 5. BLOQUE: RESUMEN EJECUTIVO
    nombres_meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    now = datetime.now()
    meses_ultimos = []
    for i in range(5, -1, -1):
        target_month_num = now.month - i
        target_year = now.year
        while target_month_num <= 0:
            target_month_num += 12
            target_year -= 1
        meses_ultimos.append((target_year, target_month_num, nombres_meses[target_month_num - 1]))

    tendencia_mensual = []
    for y, m, m_lbl in meses_ultimos:
        cnt = 0
        for p in prestamos:
            fp = p.get("fecha_prestamo")
            if fp:
                try:
                    dt = datetime.fromisoformat(fp.replace("Z", "+00:00"))
                    if dt.year == y and dt.month == m:
                        cnt += 1
                except Exception:
                    pass
        tendencia_mensual.append({
            "month": m_lbl,
            "shortMonth": m_lbl,
            "count": cnt
        })

    # Libros más prestados reales
    libros_top = []
    for idx, (tit, count) in enumerate(sorted(frecuencia_libros.items(), key=lambda x: x[1], reverse=True)[:5]):
        libros_top.append({
            "id": f"top-{idx+1}",
            "title": tit,
            "count": count
        })
    if len(libros_top) == 0:
        for idx, lb in enumerate(libros[:5]):
            libros_top.append({
                "id": f"lib-{idx+1}",
                "title": lb.get("titulo", f"Libro #{idx+1}"),
                "count": 0
            })

    total_prestamos_count = len(prestamos)
    distribucion_estados = [
        {
            "status": "RETURNED",
            "label": "Devueltos",
            "count": devueltos_count,
            "percentage": round((devueltos_count / total_prestamos_count * 100)) if total_prestamos_count > 0 else 0,
            "color": "#27AE60"
        },
        {
            "status": "ACTIVE",
            "label": "Activos",
            "count": activos_count,
            "percentage": round((activos_count / total_prestamos_count * 100)) if total_prestamos_count > 0 else 0,
            "color": "#2F80ED"
        },
        {
            "status": "OVERDUE",
            "label": "Vencidos",
            "count": vencidos_count,
            "percentage": round((vencidos_count / total_prestamos_count * 100)) if total_prestamos_count > 0 else 0,
            "color": "#EB5757"
        }
    ]

    color_palette = ["#2F80ED", "#27AE60", "#F2994A", "#9B51E0", "#EB5757", "#06B6D4"]
    categorias_metrics = []
    for idx, d_stat in enumerate(dewey_stats[:6]):
        categorias_metrics.append({
            "category": d_stat["clasificacion"],
            "count": d_stat["cantidad"],
            "color": color_palette[idx % len(color_palette)]
        })

    avatar_colors = ["#2F80ED", "#27AE60", "#D97706", "#8B5CF6", "#06B6D4", "#EC4899"]
    overdue_loans = []
    # Filtrar todos los que se determinaron como vencidos
    prestamos_vencidos_lista = [x for x in prestamos if x.get("_estado_calculado") == "vencido"]

    for idx, p in enumerate(prestamos_vencidos_lista):
        u = p.get("usuarios") or {}
        u_name = u.get("nombre_completo") or "Usuario del sistema"
        initials = "".join([part[0] for part in u_name.split()[:2]]).upper() or "US"
        ej = p.get("ejemplares") or {}
        lb = ej.get("libros") or {} if isinstance(ej, dict) else {}
        b_title = lb.get("titulo") if isinstance(lb, dict) else f"Ejemplar #{p.get('ejemplar_id')}"
        
        due_iso = p.get("fecha_limite_devolucion") or ""
        days_overdue = p.get("_dias_retraso", 0)

        overdue_loans.append({
            "id": p.get("id"),
            "folio": f"PR-{str(idx + 1).zfill(3)}",
            "userName": u_name,
            "userInitials": initials,
            "userAvatarColor": avatar_colors[idx % len(avatar_colors)],
            "bookTitle": b_title,
            "dueDate": due_iso[:10] if due_iso else "Hoy",
            "daysOverdue": days_overdue,
            "status": "OVERDUE"
        })

    return {
        "circulacion": {
            "total_prestamos": total_prestamos_count,
            "prestamos_sala": prestamos_sala,
            "prestamos_domicilio": prestamos_domicilio,
            "renovaciones": renovaciones_totales,
            "prestamos_por_tipo_usuario": [{"tipo": k, "cantidad": v} for k, v in prestamos_por_tipo.items()],
            "prestamos_por_carrera": [{"carrera": k, "cantidad": v} for k, v in prestamos_por_carrera.items()],
            "frecuencia_acervo": ranking_acervo,
            "sanciones": {
                "usuarios_sancionados": usuarios_sancionados_count,
                "total_sanciones": len(sanciones),
                "monto_total": total_multas_monto,
                "monto_pendiente": multas_pendientes_monto,
                "monto_recaudado": multas_recaudadas_monto,
                "por_tipo": [{"tipo": k, "cantidad": v} for k, v in sanciones_por_tipo.items()],
                "detalle": sanciones
            }
        },
        "procesos_tecnicos": {
            "total_titulos": len(libros),
            "total_ejemplares": len(ejemplares),
            "productividad_catalogador": [{"catalogador": k, "fichas_creadas": v} for k, v in catalogadores.items()],
            "altas_por_periodo": [{"periodo": k, "titulos": v} for k, v in altas_por_anio.items()]
        },
        "inventario": {
            "existencias_totales": len(ejemplares),
            "distribucion_estados": [{"estado": k.capitalize(), "cantidad": v} for k, v in ejemplares_estados.items()],
            "existencias_dewey": dewey_stats,
            "perdidos_o_bajas": ejemplares_estados.get("extraviado", 0) + ejemplares_estados.get("baja", 0)
        },
        "servicios": {
            "espacios": {
                "total_espacios": len(espacios),
                "total_reservas": len(reservas),
                "uso_por_espacio": [{"espacio": k, "reservas": v} for k, v in espacios_uso.items()],
                "detalle_reservas": reservas
            },
            "computo": {
                "total_equipos": len(equipos),
                "total_sesiones": len(sesiones_computo),
                "minutos_totales": minutos_computo,
                "horas_totales": round(minutos_computo / 60, 1),
                "detalle_sesiones": sesiones_computo
            }
        },
        "resumen_ejecutivo": {
            "metricas": {
                "totalLoans": total_prestamos_count,
                "totalLoansGrowth": f"{total_prestamos_count} registros totales",
                "activeLoans": activos_count,
                "returnedLoans": devueltos_count,
                "returnedGrowth": f"{devueltos_count} devueltos",
                "overdueLoans": vencidos_count,
                "overdueDifference": "Al día" if vencidos_count == 0 else f"{vencidos_count} con retraso"
            },
            "tendencia_mensual": tendencia_mensual,
            "libros_top": libros_top,
            "distribucion_estados": distribucion_estados,
            "categorias_solicitadas": categorias_metrics,
            "actividad_reciente": overdue_loans,
            "alertas": {
                "ejemplares_no_disponibles": sum(1 for e in ejemplares if e.get("estado") in ["prestado", "mantenimiento"]),
                "multas_pendientes": multas_pendientes_monto,
                "prestamos_vencidos": vencidos_count
            }
        },
        "catalogos": {
            "usuarios": [{"id": u.get("id"), "nombre": u.get("nombre_completo"), "email": u.get("email")} for u in usuarios],
            "espacios": [{"id": e.get("id"), "nombre": e.get("nombre"), "tipo": e.get("tipo")} for e in espacios],
            "equipos": [{"id": eq.get("id"), "codigo": eq.get("codigo"), "ubicacion": eq.get("ubicacion_sala")} for eq in equipos],
            "ejemplares": [{"id": ej.get("id"), "codigo": ej.get("codigo_inventario"), "estado": ej.get("estado")} for ej in ejemplares]
        }
    }


# Endpoints para capturar / ingresar valores en la base de datos
@router.post("/sancion")
async def create_sancion(payload: CreateSancionPayload):
    """Registra una nueva sanción o multa contable en Supabase."""
    headers = {
        "apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }
    body = {
        "usuario_id": payload.usuario_id,
        "tipo_sancion": payload.tipo_sancion,
        "monto_multa": payload.monto_multa,
        "estado_pago": payload.estado_pago,
        "motivo": payload.motivo
    }
    async with httpx.AsyncClient() as client:
        resp = await client.post(f"{settings.SUPABASE_URL}/rest/v1/sanciones_multas", json=body, headers=headers)
        if resp.status_code >= 400:
            raise HTTPException(status_code=resp.status_code, detail=resp.text)
        return resp.json()


@router.post("/reserva-espacio")
async def create_reserva_espacio(payload: CreateReservaEspacioPayload):
    """Registra una reserva u ocupación de cubículo / sala en Supabase."""
    headers = {
        "apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }
    body = {
        "usuario_id": payload.usuario_id,
        "espacio_id": payload.espacio_id,
        "inicio": payload.inicio,
        "fin": payload.fin,
        "estado": payload.estado
    }
    async with httpx.AsyncClient() as client:
        resp = await client.post(f"{settings.SUPABASE_URL}/rest/v1/reservas_espacios", json=body, headers=headers)
        if resp.status_code >= 400:
            raise HTTPException(status_code=resp.status_code, detail=resp.text)
        return resp.json()


@router.post("/sesion-computo")
async def create_sesion_computo(payload: CreateSesionComputoPayload):
    """Registra una sesión de uso de equipo de cómputo en Supabase."""
    headers = {
        "apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }
    now_iso = datetime.now().isoformat()
    body = {
        "usuario_id": payload.usuario_id,
        "equipo_id": payload.equipo_id,
        "inicio": now_iso,
        "duracion_minutos": payload.duracion_minutos
    }
    async with httpx.AsyncClient() as client:
        resp = await client.post(f"{settings.SUPABASE_URL}/rest/v1/sesiones_computo", json=body, headers=headers)
        if resp.status_code >= 400:
            raise HTTPException(status_code=resp.status_code, detail=resp.text)
        return resp.json()


@router.post("/ejemplar-estado")
async def update_ejemplar_estado(payload: UpdateEjemplarEstadoPayload):
    """Actualiza el estado de un ejemplar (por ejemplo: baja, extraviado, en mantenimiento)."""
    headers = {
        "apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }
    body: Dict[str, Any] = {"estado": payload.estado}
    if payload.observaciones:
        body["observaciones"] = payload.observaciones
    if payload.estado in ["baja", "extraviado"]:
        body["fecha_baja"] = datetime.now().isoformat()

    async with httpx.AsyncClient() as client:
        resp = await client.patch(
            f"{settings.SUPABASE_URL}/rest/v1/ejemplares?id=eq.{payload.ejemplar_id}",
            json=body,
            headers=headers
        )
        if resp.status_code >= 400:
            raise HTTPException(status_code=resp.status_code, detail=resp.text)
        return resp.json()
