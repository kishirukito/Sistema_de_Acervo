from __future__ import annotations

from datetime import datetime, timezone
from typing import Any, Dict, List, Optional, Tuple
import httpx

from app.core.config import settings


REPORT_CATALOG: List[Dict[str, str]] = [
    {
        "id": "rep-carreras",
        "code": "REP-CIR-01",
        "title": "Reporte de Préstamos por Carrera",
        "badge": "Circulación y Demanda Estudiantil",
        "description": "Población atendida por programa educativo, títulos prestados, clasificación Dewey, tiempos y modalidad de préstamo.",
        "orientation": "landscape",
    },
    {
        "id": "rep-sanciones",
        "code": "REP-FIN-02",
        "title": "Reporte Contable de Multas y Sanciones",
        "badge": "Financiero y Administrativo",
        "description": "Registro de sanciones emitidas, motivo, desglose financiero tasado/pagado/pendiente, estado y fechas.",
        "orientation": "landscape",
    },
    {
        "id": "rep-inventario",
        "code": "REP-PAT-03",
        "title": "Estado Físico de Ejemplares e Inventario",
        "badge": "Control Patrimonial y Activos",
        "description": "Identificación de ejemplares físicos, ubicación en estante, estado de conservación e historial de préstamos.",
        "orientation": "landscape",
    },
    {
        "id": "rep-acervo",
        "code": "REP-ROT-04",
        "title": "Frecuencia de Consulta del Acervo",
        "badge": "Análisis de Rotación y Adquisiciones",
        "description": "Disponibilidad de ejemplares vs. préstamos del periodo, tasa de rotación, solicitudes en espera y sugerencias de compra.",
        "orientation": "landscape",
    },
    {
        "id": "rep-morosidad",
        "code": "REP-MOR-05",
        "title": "Reporte de Morosidad y Préstamos Vencidos",
        "badge": "Seguimiento Directo",
        "description": "Alumnos con préstamos vencidos hoy o con más de 3 días de retraso, datos de contacto y fecha límite.",
        "orientation": "landscape",
    },
    {
        "id": "rep-convenios",
        "code": "REP-RED-06",
        "title": "Reporte de Convenios y Préstamos Interbibliotecarios",
        "badge": "Cooperación Interbibliotecaria",
        "description": "Instituciones en convenio, responsable titular, folio de oficio y préstamos externos registrados.",
        "orientation": "landscape",
    },
    {
        "id": "rep-cedula",
        "code": "CED-EST-07",
        "title": "Cédula Estadística de Servicios Bibliotecarios",
        "badge": "Formato Oficial para Dirección",
        "description": "Resumen oficial de títulos, volúmenes físicos, usuarios atendidos por mes y préstamos en sala vs. domicilio.",
        "orientation": "portrait",
    },
]


def _parse_iso_dt(value: Optional[str]) -> Optional[datetime]:
    if not value:
        return None
    try:
        clean = str(value).strip().replace("Z", "+00:00")
        dt = datetime.fromisoformat(clean)
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        return dt
    except Exception:
        return None


def _fmt_date(value: Optional[str]) -> str:
    dt = _parse_iso_dt(value)
    if not dt:
        return "No disponible"
    return dt.strftime("%Y-%m-%d")


def _in_date_range(
    iso_value: Optional[str],
    start_dt: Optional[datetime],
    end_dt: Optional[datetime],
) -> bool:
    if not start_dt and not end_dt:
        return True
    dt = _parse_iso_dt(iso_value)
    if not dt:
        return False
    if start_dt and dt < start_dt:
        return False
    if end_dt and dt > end_dt:
        return False
    return True


def _matches_search(row: Dict[str, Any], search_query: str) -> bool:
    if not search_query:
        return True
    q = search_query.lower().strip()
    if not q:
        return True
    return any(q in str(v).lower() for v in row.values() if v is not None)


async def _fetch_supabase_report_sources() -> Dict[str, List[Dict[str, Any]]]:
    headers = {
        "apikey": settings.SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {settings.SUPABASE_SERVICE_ROLE_KEY}",
    }
    base = settings.SUPABASE_URL.rstrip("/")

    async with httpx.AsyncClient(timeout=15.0) as client:
        # Sincronizar préstamos activos vencidos antes de consultar
        try:
            now_iso = datetime.now(timezone.utc).isoformat()
            await client.patch(
                f"{base}/rest/v1/prestamos?estado=eq.activo&fecha_limite_devolucion=lte.{now_iso}&fecha_devolucion_real=is.null",
                json={"estado": "vencido"},
                headers=headers,
            )
        except Exception:
            pass

        async def get_with_fallback(primary_url: str, fallback_url: str) -> List[Dict[str, Any]]:
            resp = await client.get(primary_url, headers=headers)
            if resp.status_code in (400, 404):
                resp = await client.get(fallback_url, headers=headers)
            if resp.is_success:
                data = resp.json()
                return data if isinstance(data, list) else []
            return []

        import asyncio

        prestamos_primary = (
            f"{base}/rest/v1/prestamos?select="
            "id,usuario_id,ejemplar_id,tipo_prestamo_id,fecha_prestamo,fecha_limite_devolucion,fecha_devolucion_real,estado,notas,renovaciones_count,"
            "institucion_id,folio_oficio,responsable_externo_nombre,responsable_externo_cargo,responsable_externo_contacto,"
            "tipos_prestamo(id,clave,nombre),"
            "usuarios:usuarios!prestamos_usuario_id_fkey(id,nombre_completo,email,matricula_o_nomina,telefono,rol,dependencia_o_area,carrera_id,tipos_usuario(nombre),carreras(id,nivel,nombre)),"
            "instituciones_convenio(id,nombre,nombre_biblioteca,clave_convenio,responsable_titular,responsable_email,responsable_telefono,activa),"
            "ejemplares(id,estado,codigo_inventario,ubicacion_estante,libros(id,titulo,isbn,edicion,anio_publicacion,clasificacion_dewey,editoriales(nombre),libro_autores(autores(nombre))))"
            "&order=fecha_prestamo.desc"
        )
        prestamos_fallback = (
            f"{base}/rest/v1/prestamos?select="
            "*,tipos_prestamo(id,clave,nombre),"
            "usuarios:usuarios!prestamos_usuario_id_fkey(id,nombre_completo,email,matricula_o_nomina,telefono,rol,dependencia_o_area,carrera_id,tipos_usuario(nombre),carreras(id,nivel,nombre)),"
            "instituciones_convenio(id,nombre,nombre_biblioteca),"
            "ejemplares(id,estado,codigo_inventario,libros(id,titulo,clasificacion_dewey))"
            "&order=fecha_prestamo.desc"
        )

        sanciones_primary = (
            f"{base}/rest/v1/sanciones_multas?select="
            "id,usuario_id,tipo_sancion,monto_multa,estado_pago,motivo,created_at,"
            "usuarios(id,nombre_completo,email,matricula_o_nomina,dependencia_o_area,carreras(nombre))"
            "&order=created_at.desc"
        )
        sanciones_fallback = (
            f"{base}/rest/v1/sanciones_multas?select=*,usuarios(id,nombre_completo,email,matricula_o_nomina)&order=created_at.desc"
        )

        libros_primary = (
            f"{base}/rest/v1/libros?select="
            "id,isbn,titulo,anio_publicacion,edicion,clasificacion_dewey,created_at,"
            "editoriales(nombre),"
            "libro_autores(orden,autores(nombre)),"
            "ejemplares(id,codigo_inventario,estado,ubicacion_estante,observaciones,created_at)"
            "&order=titulo.asc"
        )
        libros_fallback = (
            f"{base}/rest/v1/libros?select=id,titulo,anio_publicacion,clasificacion_dewey,created_at&order=titulo.asc"
        )

        ejemplares_primary = (
            f"{base}/rest/v1/ejemplares?select="
            "id,libro_id,codigo_inventario,estado,ubicacion_estante,observaciones,created_at,"
            "libros(id,isbn,titulo,anio_publicacion,edicion,clasificacion_dewey,editoriales(nombre),libro_autores(autores(nombre)))"
            "&order=codigo_inventario.asc"
        )
        ejemplares_fallback = (
            f"{base}/rest/v1/ejemplares?select=id,libro_id,codigo_inventario,estado,ubicacion_estante,observaciones,created_at"
        )

        solicitudes_primary = (
            f"{base}/rest/v1/solicitudes_prestamo?select="
            "id,folio,usuario_id,libro_id,fecha_solicitud,estado"
            "&order=fecha_solicitud.desc"
        )
        solicitudes_fallback = f"{base}/rest/v1/solicitudes_prestamo?select=*"

        instituciones_primary = (
            f"{base}/rest/v1/instituciones_convenio?select="
            "id,nombre,nombre_biblioteca,clave_convenio,responsable_titular,responsable_email,responsable_telefono,direccion,activa,created_at"
            "&order=nombre.asc"
        )
        instituciones_fallback = f"{base}/rest/v1/instituciones_convenio?select=*"

        results = await asyncio.gather(
            get_with_fallback(prestamos_primary, prestamos_fallback),
            get_with_fallback(sanciones_primary, sanciones_fallback),
            get_with_fallback(libros_primary, libros_fallback),
            get_with_fallback(ejemplares_primary, ejemplares_fallback),
            get_with_fallback(solicitudes_primary, solicitudes_fallback),
            get_with_fallback(instituciones_primary, instituciones_fallback),
        )

        return {
            "prestamos": results[0],
            "sanciones": results[1],
            "libros": results[2],
            "ejemplares": results[3],
            "solicitudes": results[4],
            "instituciones": results[5],
        }


def _extract_autores(libro: Dict[str, Any]) -> str:
    la = libro.get("libro_autores")
    if isinstance(la, list) and la:
        names = [
            str((item.get("autores") or {}).get("nombre") or "").strip()
            for item in la
            if isinstance(item, dict)
        ]
        names = [n for n in names if n]
        if names:
            return ", ".join(names)
    return "No disponible"


def _extract_carrera_usuario(user: Dict[str, Any], inst: Optional[Dict[str, Any]] = None) -> str:
    if isinstance(user, dict):
        c_obj = user.get("carreras")
        if isinstance(c_obj, dict) and c_obj.get("nombre"):
            return str(c_obj["nombre"])
        if user.get("dependencia_o_area"):
            return str(user["dependencia_o_area"])
    if isinstance(inst, dict) and inst.get("nombre"):
        return str(inst["nombre"])
    return "No disponible"


def _loan_folio(loan: Dict[str, Any], idx: int) -> str:
    # Mantiene identificador legible consistente con el frontend cuando no hay folio explícito
    raw_id = str(loan.get("id") or "")
    if loan.get("folio"):
        return str(loan["folio"])
    return f"PR-{str(idx + 1).zfill(3)}" if not raw_id else f"PR-{str(idx + 1).zfill(3)}"


def _compute_loan_status_and_delay(loan: Dict[str, Any], now_ref: datetime) -> Tuple[str, int]:
    returned = loan.get("estado") == "devuelto" or bool(loan.get("fecha_devolucion_real"))
    if returned:
        return "Devuelto", 0
    due_dt = _parse_iso_dt(loan.get("fecha_limite_devolucion"))
    if loan.get("estado") == "vencido" or (due_dt is not None and now_ref >= due_dt):
        delay = 0
        if due_dt is not None and now_ref >= due_dt:
            delay = max(0, int((now_ref - due_dt).total_seconds() // 86400))
        return "Vencido", delay
    return "Activo", 0


async def build_report_model(
    report_id: str,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    search_query: str = "",
) -> Dict[str, Any]:
    meta = next((r for r in REPORT_CATALOG if r["id"] == report_id), REPORT_CATALOG[0])
    report_id = meta["id"]

    start_dt: Optional[datetime] = None
    end_dt: Optional[datetime] = None
    if start_date:
        parsed_s = _parse_iso_dt(f"{start_date}T00:00:00+00:00")
        if parsed_s:
            start_dt = parsed_s
    if end_date:
        parsed_e = _parse_iso_dt(f"{end_date}T23:59:59+00:00")
        if parsed_e:
            end_dt = parsed_e

    period_label = (
        f"Del {start_date} al {end_date}"
        if start_date and end_date
        else f"Del {start_date} a la fecha"
        if start_date
        else f"Hasta {end_date}"
        if end_date
        else "Periodo completo (todos los registros)"
    )

    now_ref = datetime.now(timezone.utc)
    generated_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    cutoff_date = end_date if end_date else datetime.now().strftime("%Y-%m-%d")

    sources = await _fetch_supabase_report_sources()
    prestamos_all = sources["prestamos"]
    sanciones_all = sources["sanciones"]
    libros_all = sources["libros"]
    ejemplares_all = sources["ejemplares"]
    solicitudes_all = sources["solicitudes"]
    instituciones_all = sources["instituciones"]

    filters_applied = [
        {"label": "Periodo consultado", "value": period_label},
        {"label": "Búsqueda aplicada", "value": search_query.strip() if search_query.strip() else "Ninguna (todos los registros)"},
        {"label": "Impacto de búsqueda", "value": "La búsqueda escrita filtra pantalla, Excel y PDF con el mismo corte de datos."},
    ]

    # Conteo histórico total de préstamos por ejemplar (para inventario)
    ejemplar_loan_counts: Dict[str, int] = {}
    for p in prestamos_all:
        ej_id = str(p.get("ejemplar_id") or "")
        if ej_id:
            ejemplar_loan_counts[ej_id] = ejemplar_loan_counts.get(ej_id, 0) + 1

    # ------------------------------------------------------------------
    # 5.1 REPORTE DE PRÉSTAMOS POR CARRERA
    # ------------------------------------------------------------------
    if report_id == "rep-carreras":
        filtered_loans = [
            p for p in prestamos_all
            if _in_date_range(p.get("fecha_prestamo"), start_dt, end_dt)
        ]

        rows: List[Dict[str, Any]] = []
        carrera_counts: Dict[str, int] = {}
        carrera_users: Dict[str, set] = {}
        carrera_books: Dict[str, Dict[str, int]] = {}
        modalidad_counts: Dict[str, int] = {}
        on_time_count = 0
        returned_total = 0

        for idx, p in enumerate(filtered_loans):
            u = p.get("usuarios") if isinstance(p.get("usuarios"), dict) else {}
            inst = p.get("instituciones_convenio") if isinstance(p.get("instituciones_convenio"), dict) else {}
            ej = p.get("ejemplares") if isinstance(p.get("ejemplares"), dict) else {}
            lb = ej.get("libros") if isinstance(ej.get("libros"), dict) else {}
            tp = p.get("tipos_prestamo") if isinstance(p.get("tipos_prestamo"), dict) else {}

            tipo_usuario = (
                (u.get("tipos_usuario") or {}).get("nombre")
                if isinstance(u.get("tipos_usuario"), dict)
                else None
            )
            if not tipo_usuario:
                if inst:
                    tipo_usuario = "Externo (Convenio)"
                elif u.get("rol") == "docente":
                    tipo_usuario = "Docente"
                else:
                    tipo_usuario = "Alumno"

            carrera = _extract_carrera_usuario(u, inst)
            titulo = str(lb.get("titulo") or "No disponible")
            dewey = str(lb.get("clasificacion_dewey") or "No disponible")
            modalidad = str(tp.get("nombre") or p.get("tipo_prestamo") or "Domicilio")
            status_lbl, _ = _compute_loan_status_and_delay(p, now_ref)

            row = {
                "folio": _loan_folio(p, idx),
                "matricula": str(u.get("matricula_o_nomina") or "No disponible"),
                "usuario": str(u.get("nombre_completo") or p.get("responsable_externo_nombre") or "No disponible"),
                "carrera": carrera,
                "tipoUsuario": str(tipo_usuario),
                "libro": titulo,
                "dewey": dewey,
                "fechaPrestamo": _fmt_date(p.get("fecha_prestamo")),
                "fechaLimite": _fmt_date(p.get("fecha_limite_devolucion")),
                "fechaDevolucion": _fmt_date(p.get("fecha_devolucion_real")) if p.get("fecha_devolucion_real") else ("En posesión" if status_lbl != "Devuelto" else "No disponible"),
                "modalidad": modalidad,
                "estado": status_lbl,
            }
            if _matches_search(row, search_query):
                rows.append(row)
                carrera_counts[carrera] = carrera_counts.get(carrera, 0) + 1
                u_key = str(p.get("usuario_id") or row["usuario"])
                carrera_users.setdefault(carrera, set()).add(u_key)
                carrera_books.setdefault(carrera, {})[titulo] = carrera_books.setdefault(carrera, {}).get(titulo, 0) + 1
                modalidad_counts[modalidad] = modalidad_counts.get(modalidad, 0) + 1

                if status_lbl == "Devuelto":
                    returned_total += 1
                    lim = _parse_iso_dt(p.get("fecha_limite_devolucion"))
                    real = _parse_iso_dt(p.get("fecha_devolucion_real"))
                    if lim and real and real <= lim:
                        on_time_count += 1

        total_rows = len(rows)
        unique_users = len({r["usuario"] for r in rows})
        top_carrera = max(carrera_counts.items(), key=lambda x: x[1])[0] if carrera_counts else "Sin datos"
        avg_per_career = round(total_rows / len(carrera_counts), 2) if carrera_counts else 0.0
        on_time_rate = (on_time_count / returned_total) if returned_total > 0 else 0.0

        top_carreras_sorted = sorted(carrera_counts.items(), key=lambda x: x[1], reverse=True)[:8]
        modalidad_sorted = sorted(modalidad_counts.items(), key=lambda x: x[1], reverse=True)

        recs = []
        if total_rows == 0:
            recs.append("Sin datos para el periodo y filtros seleccionados.")
        else:
            recs.append(f"La carrera/área con mayor demanda registrada es '{top_carrera}' con {carrera_counts[top_carrera]} préstamo(s).")
            top_book_global = sorted(
                ((b, c) for c_map in carrera_books.values() for b, c in c_map.items()),
                key=lambda x: x[1],
                reverse=True,
            )
            if top_book_global:
                recs.append(f"Título más solicitado en el corte: '{top_book_global[0][0]}'.")

        return {
            **meta,
            "period_label": period_label,
            "start_date": start_date or "",
            "end_date": end_date or "",
            "filters_applied": filters_applied,
            "generated_at": generated_at,
            "cutoff_date": cutoff_date,
            "pdf_orientation": "landscape",
            "kpis": [
                {"label": "Total de préstamos", "value": total_rows, "numeric_value": total_rows, "format": "int", "highlight": False},
                {"label": "Usuarios atendidos", "value": unique_users, "numeric_value": unique_users, "format": "int", "highlight": False},
                {"label": "Promedio por carrera", "value": avg_per_career, "numeric_value": avg_per_career, "format": "float", "highlight": False},
                {"label": "Carrera con mayor lectura", "value": top_carrera, "numeric_value": None, "format": "text", "highlight": True},
                {"label": "% Devolución a tiempo", "value": round(on_time_rate * 100, 1), "numeric_value": on_time_rate, "format": "percent", "highlight": False},
            ],
            "charts": [
                {
                    "id": "chart-carreras",
                    "type": "bar",
                    "title": "Préstamos por Carrera / Área",
                    "subtitle": "Distribución real del periodo",
                    "categories": [k for k, _ in top_carreras_sorted] or ["Sin datos"],
                    "series_name": "Préstamos",
                    "values": [v for _, v in top_carreras_sorted] or [0],
                    "value_format": "int",
                },
                {
                    "id": "chart-modalidad",
                    "type": "bar",
                    "title": "Préstamos por Modalidad",
                    "subtitle": "Domicilio, Sala e Interbibliotecario",
                    "categories": [k for k, _ in modalidad_sorted] or ["Sin datos"],
                    "series_name": "Cantidad",
                    "values": [v for _, v in modalidad_sorted] or [0],
                    "value_format": "int",
                },
            ],
            "columns": [
                {"key": "folio", "header": "Folio", "type": "text", "width_hint": 11, "align": "left"},
                {"key": "matricula", "header": "Matrícula / Nómina", "type": "text", "width_hint": 18, "align": "left"},
                {"key": "usuario", "header": "Nombre del usuario", "type": "text", "width_hint": 26, "align": "left"},
                {"key": "carrera", "header": "Carrera / Área", "type": "text", "width_hint": 32, "align": "left"},
                {"key": "tipoUsuario", "header": "Tipo", "type": "text", "width_hint": 14, "align": "left"},
                {"key": "libro", "header": "Título del libro", "type": "text", "width_hint": 34, "align": "left"},
                {"key": "dewey", "header": "Clasif. Dewey", "type": "text", "width_hint": 16, "align": "left"},
                {"key": "fechaPrestamo", "header": "Fecha préstamo", "type": "date", "width_hint": 14, "align": "center"},
                {"key": "fechaLimite", "header": "Fecha límite", "type": "date", "width_hint": 14, "align": "center"},
                {"key": "fechaDevolucion", "header": "Fecha devolución", "type": "date", "width_hint": 15, "align": "center"},
                {"key": "modalidad", "header": "Modalidad", "type": "text", "width_hint": 16, "align": "left"},
                {"key": "estado", "header": "Estado", "type": "text", "width_hint": 12, "align": "center"},
            ],
            "rows": rows,
            "total_row": {
                "folio": "TOTALES",
                "matricula": f"{total_rows} registros",
                "usuario": f"{unique_users} usuarios",
                "carrera": f"{len(carrera_counts)} carreras/áreas",
                "tipoUsuario": "",
                "libro": "",
                "dewey": "",
                "fechaPrestamo": "",
                "fechaLimite": "",
                "fechaDevolucion": f"{returned_total} devueltos",
                "modalidad": "",
                "estado": "",
            },
            "recommendations": recs,
            "methodology": {
                "definitions": [
                    "Total de préstamos: Conteo de registros en la tabla 'prestamos' cuya fecha_prestamo cae en el periodo.",
                    "Promedio por carrera: Total de préstamos dividido entre el número de carreras/áreas distintas con al menos 1 préstamo.",
                    "% Devolución a tiempo: Porcentaje de préstamos devueltos donde fecha_devolucion_real <= fecha_limite_devolucion.",
                ],
                "formulas": [
                    "Promedio por carrera = Total préstamos / Carreras distintas",
                    "Tasa a tiempo = Préstamos devueltos en plazo / Total préstamos devueltos",
                ],
                "rules": ["Los préstamos sin fecha de devolución real muestran 'En posesión'."],
                "scope": ["Fuente: tabla 'prestamos' unida con 'usuarios', 'carreras', 'tipos_prestamo', 'ejemplares' y 'libros'."],
                "limitations": ["Si un usuario no tiene matrícula o carrera asignada en la BD, se muestra 'No disponible'."],
            },
            "default_file_name": "reporte_prestamos_por_carrera",
        }

    # ------------------------------------------------------------------
    # 5.2 REPORTE CONTABLE DE MULTAS Y SANCIONES
    # ------------------------------------------------------------------
    if report_id == "rep-sanciones":
        filtered_sanciones = [
            s for s in sanciones_all
            if _in_date_range(s.get("created_at"), start_dt, end_dt)
        ]

        rows = []
        status_totals: Dict[str, float] = {"Pagado": 0.0, "Pendiente": 0.0, "Condonado": 0.0}
        tipo_counts: Dict[str, int] = {}
        total_tasado = 0.0
        total_pagado = 0.0
        total_pendiente = 0.0

        for idx, s in enumerate(filtered_sanciones):
            u = s.get("usuarios") if isinstance(s.get("usuarios"), dict) else {}
            monto = float(s.get("monto_multa") or 0.0)
            est_raw = str(s.get("estado_pago") or "pendiente").lower()
            if est_raw == "pagado":
                est_lbl = "Pagado"
                pagado = monto
                pendiente = 0.0
                status_totals["Pagado"] += monto
            elif est_raw == "condonado":
                est_lbl = "Condonado"
                pagado = 0.0
                pendiente = 0.0
                status_totals["Condonado"] += monto
            else:
                est_lbl = "Pendiente de cobro"
                pagado = 0.0
                pendiente = monto
                status_totals["Pendiente"] += monto

            carrera_u = (u.get("carreras") or {}).get("nombre") if isinstance(u.get("carreras"), dict) else None
            ident = " / ".join([x for x in [u.get("matricula_o_nomina"), u.get("email")] if x]) or "No disponible"

            row = {
                "folioSancion": f"SAN-{str(s.get('id') or idx + 1)[:8].upper()}",
                "nombre": str(u.get("nombre_completo") or "No disponible"),
                "identificador": ident,
                "carrera": str(carrera_u or u.get("dependencia_o_area") or "No disponible"),
                "tipoSancion": str(s.get("tipo_sancion") or "multa").capitalize(),
                "motivo": str(s.get("motivo") or "No disponible"),
                "montoTasado": round(monto, 2),
                "montoPagado": round(pagado, 2),
                "montoPendiente": round(pendiente, 2),
                "folioRecibo": "No disponible",
                "estado": est_lbl,
                "fechaEmision": _fmt_date(s.get("created_at")),
                "fechaLiquidacion": "No disponible",
            }
            if _matches_search(row, search_query):
                rows.append(row)
                total_tasado += monto
                total_pagado += pagado
                total_pendiente += pendiente
                tipo_counts[row["tipoSancion"]] = tipo_counts.get(row["tipoSancion"], 0) + 1

        recovery_rate = (total_pagado / total_tasado) if total_tasado > 0 else 0.0
        recs = []
        if not rows:
            recs.append("Sin datos de multas o sanciones para el periodo seleccionado.")
        else:
            if total_pendiente > 0:
                recs.append(f"Existe un saldo pendiente de cobro por ${total_pendiente:,.2f} MXN que requiere seguimiento en caja.")
            else:
                recs.append("No hay saldos pendientes de cobro en el periodo analizado.")

        return {
            **meta,
            "period_label": period_label,
            "start_date": start_date or "",
            "end_date": end_date or "",
            "filters_applied": filters_applied,
            "generated_at": generated_at,
            "cutoff_date": cutoff_date,
            "pdf_orientation": "landscape",
            "kpis": [
                {"label": "Total sanciones", "value": len(rows), "numeric_value": len(rows), "format": "int", "highlight": False},
                {"label": "Monto total tasado", "value": round(total_tasado, 2), "numeric_value": total_tasado, "format": "currency", "highlight": False},
                {"label": "Monto pagado", "value": round(total_pagado, 2), "numeric_value": total_pagado, "format": "currency", "highlight": False},
                {"label": "Monto pendiente", "value": round(total_pendiente, 2), "numeric_value": total_pendiente, "format": "currency", "highlight": total_pendiente > 0},
                {"label": "Tasa de recaudación", "value": round(recovery_rate * 100, 1), "numeric_value": recovery_rate, "format": "percent", "highlight": False},
            ],
            "charts": [
                {
                    "id": "chart-sanciones-estado",
                    "type": "bar",
                    "title": "Montos por Estado de Pago (MXN)",
                    "subtitle": "Pagado, Pendiente y Condonado",
                    "categories": list(status_totals.keys()),
                    "series_name": "Monto MXN",
                    "values": [round(v, 2) for v in status_totals.values()],
                    "value_format": "currency",
                },
                {
                    "id": "chart-sanciones-tipo",
                    "type": "bar",
                    "title": "Cantidad por Tipo de Sanción",
                    "subtitle": "Multas, amonestaciones y suspensiones",
                    "categories": list(tipo_counts.keys()) or ["Sin datos"],
                    "series_name": "Cantidad",
                    "values": list(tipo_counts.values()) or [0],
                    "value_format": "int",
                },
            ],
            "columns": [
                {"key": "folioSancion", "header": "Folio sanción", "type": "text", "width_hint": 15, "align": "left"},
                {"key": "nombre", "header": "Nombre completo", "type": "text", "width_hint": 24, "align": "left"},
                {"key": "identificador", "header": "Matrícula / Correo", "type": "text", "width_hint": 28, "align": "left"},
                {"key": "carrera", "header": "Carrera", "type": "text", "width_hint": 24, "align": "left"},
                {"key": "tipoSancion", "header": "Tipo", "type": "text", "width_hint": 14, "align": "left"},
                {"key": "motivo", "header": "Motivo detallado", "type": "text", "width_hint": 32, "align": "left"},
                {"key": "montoTasado", "header": "Monto tasado", "type": "currency", "width_hint": 14, "align": "right"},
                {"key": "montoPagado", "header": "Monto pagado", "type": "currency", "width_hint": 14, "align": "right"},
                {"key": "montoPendiente", "header": "Monto pendiente", "type": "currency", "width_hint": 15, "align": "right"},
                {"key": "folioRecibo", "header": "Folio recibo", "type": "text", "width_hint": 15, "align": "center"},
                {"key": "estado", "header": "Estado", "type": "text", "width_hint": 18, "align": "center"},
                {"key": "fechaEmision", "header": "Fecha emisión", "type": "date", "width_hint": 14, "align": "center"},
                {"key": "fechaLiquidacion", "header": "Fecha liquidación", "type": "text", "width_hint": 15, "align": "center"},
            ],
            "rows": rows,
            "total_row": {
                "folioSancion": "TOTALES",
                "nombre": f"{len(rows)} sanciones",
                "identificador": "",
                "carrera": "",
                "tipoSancion": "",
                "motivo": "",
                "montoTasado": round(total_tasado, 2),
                "montoPagado": round(total_pagado, 2),
                "montoPendiente": round(total_pendiente, 2),
                "folioRecibo": "",
                "estado": "",
                "fechaEmision": "",
                "fechaLiquidacion": "",
            },
            "recommendations": recs,
            "methodology": {
                "definitions": [
                    "Monto tasado: Valor de 'monto_multa' registrado en la tabla 'sanciones_multas'.",
                    "Monto pagado: Igual a 'monto_multa' cuando 'estado_pago' es 'pagado'; de lo contrario 0.",
                    "Monto pendiente: Igual a 'monto_multa' cuando 'estado_pago' es 'pendiente'; de lo contrario 0.",
                ],
                "formulas": ["Tasa de recaudación = Monto pagado / Monto total tasado"],
                "rules": ["Los registros condonados no suman a monto pendiente ni a monto pagado."],
                "scope": ["Fuente: tabla 'sanciones_multas' unida con 'usuarios' y 'carreras'."],
                "limitations": [
                    "La tabla 'sanciones_multas' actual no almacena 'folio_recibo' ni 'fecha_liquidacion', ni pagos parciales; dichos campos se muestran como 'No disponible'."
                ],
            },
            "default_file_name": "reporte_contable_multas_sanciones",
        }

    # ------------------------------------------------------------------
    # 5.3 ESTADO FÍSICO DE EJEMPLARES E INVENTARIO
    # ------------------------------------------------------------------
    if report_id == "rep-inventario":
        filtered_ej = [
            ej for ej in ejemplares_all
            if _in_date_range(ej.get("created_at"), start_dt, end_dt)
        ]

        rows = []
        estado_counts: Dict[str, int] = {}
        estante_counts: Dict[str, int] = {}
        total_circ = 0

        for ej in filtered_ej:
            lb = ej.get("libros") if isinstance(ej.get("libros"), dict) else {}
            ed = lb.get("editoriales") if isinstance(lb.get("editoriales"), dict) else {}
            est = str(ej.get("estado") or "disponible").capitalize()
            ubic = str(ej.get("ubicacion_estante") or "No disponible")
            ej_id = str(ej.get("id") or "")
            veces_prestado = ejemplar_loan_counts.get(ej_id, 0)

            row = {
                "codigo": str(ej.get("codigo_inventario") or "No disponible"),
                "isbn": str(lb.get("isbn") or "No disponible"),
                "titulo": str(lb.get("titulo") or "No disponible"),
                "autor": _extract_autores(lb),
                "editorial": str(ed.get("nombre") or "No disponible"),
                "anio": str(lb.get("anio_publicacion") or "No disponible"),
                "estanteria": ubic,
                "pasilloColeccion": "No disponible",
                "condicionEstado": est,
                "vecesPrestado": veces_prestado,
                "valorPatrimonial": "No disponible",
                "observaciones": str(ej.get("observaciones") or "Sin observaciones"),
            }
            if _matches_search(row, search_query):
                rows.append(row)
                estado_counts[est] = estado_counts.get(est, 0) + 1
                estante_counts[ubic] = estante_counts.get(ubic, 0) + 1
                total_circ += veces_prestado

        total_ej = len(rows)
        disponibles = estado_counts.get("Disponible", 0)
        mant_baja = sum(estado_counts.get(k, 0) for k in ("Mantenimiento", "Extraviado", "Baja", "Dañado"))
        avg_circ = round(total_circ / total_ej, 2) if total_ej > 0 else 0.0
        pct_disp = (disponibles / total_ej) if total_ej > 0 else 0.0

        top_estantes = sorted(estante_counts.items(), key=lambda x: x[1], reverse=True)[:8]
        recs = []
        if not rows:
            recs.append("Sin ejemplares registrados en el rango de fechas seleccionado.")
        else:
            if mant_baja > 0:
                recs.append(f"Se detectaron {mant_baja} ejemplar(es) en mantenimiento, extravío o baja; revisar reposición.")
            else:
                recs.append("No se registran ejemplares en mantenimiento o baja en el corte actual.")

        return {
            **meta,
            "period_label": period_label,
            "start_date": start_date or "",
            "end_date": end_date or "",
            "filters_applied": filters_applied,
            "generated_at": generated_at,
            "cutoff_date": cutoff_date,
            "pdf_orientation": "landscape",
            "kpis": [
                {"label": "Total ejemplares", "value": total_ej, "numeric_value": total_ej, "format": "int", "highlight": False},
                {"label": "Disponibles", "value": disponibles, "numeric_value": disponibles, "format": "int", "highlight": False},
                {"label": "% Disponible", "value": round(pct_disp * 100, 1), "numeric_value": pct_disp, "format": "percent", "highlight": False},
                {"label": "Mantenimiento / Baja", "value": mant_baja, "numeric_value": mant_baja, "format": "int", "highlight": mant_baja > 0},
                {"label": "Prom. préstamos / ejemplar", "value": avg_circ, "numeric_value": avg_circ, "format": "float", "highlight": False},
            ],
            "charts": [
                {
                    "id": "chart-inv-estado",
                    "type": "bar",
                    "title": "Ejemplares por Estado Actual",
                    "subtitle": "Conteo real del inventario físico",
                    "categories": list(estado_counts.keys()) or ["Sin datos"],
                    "series_name": "Ejemplares",
                    "values": list(estado_counts.values()) or [0],
                    "value_format": "int",
                },
                {
                    "id": "chart-inv-estante",
                    "type": "bar",
                    "title": "Ejemplares por Estantería",
                    "subtitle": "Principales ubicaciones registradas",
                    "categories": [k for k, _ in top_estantes] or ["Sin datos"],
                    "series_name": "Ejemplares",
                    "values": [v for _, v in top_estantes] or [0],
                    "value_format": "int",
                },
            ],
            "columns": [
                {"key": "codigo", "header": "Código inventario", "type": "text", "width_hint": 18, "align": "left"},
                {"key": "isbn", "header": "ISBN", "type": "text", "width_hint": 16, "align": "left"},
                {"key": "titulo", "header": "Título", "type": "text", "width_hint": 32, "align": "left"},
                {"key": "autor", "header": "Autor", "type": "text", "width_hint": 24, "align": "left"},
                {"key": "editorial", "header": "Editorial", "type": "text", "width_hint": 20, "align": "left"},
                {"key": "anio", "header": "Año", "type": "text", "width_hint": 10, "align": "center"},
                {"key": "estanteria", "header": "Ubicación estante", "type": "text", "width_hint": 20, "align": "left"},
                {"key": "pasilloColeccion", "header": "Pasillo / Colección", "type": "text", "width_hint": 18, "align": "center"},
                {"key": "condicionEstado", "header": "Estado / Condición", "type": "text", "width_hint": 16, "align": "center"},
                {"key": "vecesPrestado", "header": "Veces prestado", "type": "int", "width_hint": 14, "align": "right"},
                {"key": "valorPatrimonial", "header": "Valor patrimonial", "type": "text", "width_hint": 16, "align": "center"},
                {"key": "observaciones", "header": "Observaciones", "type": "text", "width_hint": 24, "align": "left"},
            ],
            "rows": rows,
            "total_row": {
                "codigo": "TOTALES",
                "isbn": f"{total_ej} ejemplares",
                "titulo": "",
                "autor": "",
                "editorial": "",
                "anio": "",
                "estanteria": f"{len(estante_counts)} ubicaciones",
                "pasilloColeccion": "",
                "condicionEstado": f"{disponibles} disponibles",
                "vecesPrestado": total_circ,
                "valorPatrimonial": "No disponible",
                "observaciones": "",
            },
            "recommendations": recs,
            "methodology": {
                "definitions": [
                    "Veces prestado: Conteo histórico de filas en 'prestamos' vinculadas al 'ejemplar_id'.",
                    "Estado / Condición: Campo 'estado' real de la tabla 'ejemplares'.",
                ],
                "formulas": ["% Disponible = Ejemplares en estado 'disponible' / Total de ejemplares"],
                "rules": ["La ubicación se toma directamente de 'ubicacion_estante'."],
                "scope": ["Fuente: tabla 'ejemplares' unida con 'libros', 'editoriales', 'libro_autores' y conteo en 'prestamos'."],
                "limitations": [
                    "La base de datos actual no almacena campos separados para 'pasillo', 'colección', 'condición física' independiente ni 'valor patrimonial estimado'; por ello se muestran como 'No disponible'."
                ],
            },
            "default_file_name": "reporte_inventario_estado_fisico",
        }

    # ------------------------------------------------------------------
    # 5.4 FRECUENCIA DE CONSULTA DEL ACERVO
    # ------------------------------------------------------------------
    if report_id == "rep-acervo":
        loans_in_period = [
            p for p in prestamos_all
            if _in_date_range(p.get("fecha_prestamo"), start_dt, end_dt)
        ]
        sols_in_period = [
            s for s in solicitudes_all
            if _in_date_range(s.get("fecha_solicitud"), start_dt, end_dt)
            and str(s.get("estado") or "").lower() in ("pendiente", "aprobada")
        ]

        # Agrupar préstamos por libro_id
        loans_by_book: Dict[str, int] = {}
        active_by_book: Dict[str, int] = {}
        for p in loans_in_period:
            ej = p.get("ejemplares") if isinstance(p.get("ejemplares"), dict) else {}
            lb = ej.get("libros") if isinstance(ej.get("libros"), dict) else {}
            lb_id = str(lb.get("id") or "")
            if lb_id:
                loans_by_book[lb_id] = loans_by_book.get(lb_id, 0) + 1
                st_lbl, _ = _compute_loan_status_and_delay(p, now_ref)
                if st_lbl in ("Activo", "Vencido"):
                    active_by_book[lb_id] = active_by_book.get(lb_id, 0) + 1

        sols_by_book: Dict[str, int] = {}
        for s in sols_in_period:
            lb_id = str(s.get("libro_id") or "")
            if lb_id:
                sols_by_book[lb_id] = sols_by_book.get(lb_id, 0) + 1

        rows = []
        rot_sum = 0.0
        recommended_titles = 0
        total_queue = 0

        for lb in libros_all:
            lb_id = str(lb.get("id") or "")
            ejs = lb.get("ejemplares") if isinstance(lb.get("ejemplares"), list) else []
            total_ej_book = len(ejs)
            if total_ej_book == 0:
                total_ej_book = sum(1 for e in ejemplares_all if str(e.get("libro_id") or "") == lb_id)

            prestamos_book = loans_by_book.get(lb_id, 0)
            cola_book = sols_by_book.get(lb_id, 0)

            # Tasa de rotación calculada con fórmula documentada:
            # préstamos del periodo / ejemplares totales (topada a 100% si se interpreta como ocupación, o ratio real de rotación)
            # Para porcentaje de ocupación actual o demanda por ejemplar:
            en_uso_actual = sum(
                1 for e in ejs if str(e.get("estado") or "").lower() == "prestado"
            )
            tasa_rotacion = (en_uso_actual / total_ej_book) if total_ej_book > 0 else 0.0

            # Regla explícita de recomendación automática calculada (distinta de compra aprobada):
            if (prestamos_book >= 3 or cola_book >= 2) and total_ej_book <= 2:
                rec_auto = "Sugerencia calculada: Evaluar compra (alta demanda / pocos ejemplares)"
                recommended_titles += 1
            elif prestamos_book > 0:
                rec_auto = "Demanda cubierta con existencias actuales"
            else:
                rec_auto = "Sin préstamos en el periodo"

            row = {
                "titulo": str(lb.get("titulo") or "No disponible"),
                "autor": _extract_autores(lb),
                "edicion": str(lb.get("edicion") or "No disponible"),
                "dewey": str(lb.get("clasificacion_dewey") or "No disponible"),
                "totalEjemplares": total_ej_book,
                "prestamosPeriodo": prestamos_book,
                "tasaRotacion": round(tasa_rotacion * 100, 1),
                "tasaRotacionRaw": tasa_rotacion,
                "colaEspera": cola_book,
                "recomendacion": rec_auto,
            }
            if _matches_search(row, search_query):
                rows.append(row)
                rot_sum += tasa_rotacion
                total_queue += cola_book

        rows.sort(key=lambda r: (r["prestamosPeriodo"], r["colaEspera"]), reverse=True)
        top_books = rows[:8]
        avg_rot = (rot_sum / len(rows)) if rows else 0.0
        total_ej_sum = sum(r["totalEjemplares"] for r in rows)
        total_prest_sum = sum(r["prestamosPeriodo"] for r in rows)

        recs = []
        if not rows:
            recs.append("Sin títulos registrados en el acervo.")
        else:
            recs.append(
                f"{recommended_titles} título(s) cumplen la regla calculada de sugerencia de compra; esto es una recomendación automática y no una decisión de compra aprobada."
            )

        return {
            **meta,
            "period_label": period_label,
            "start_date": start_date or "",
            "end_date": end_date or "",
            "filters_applied": filters_applied,
            "generated_at": generated_at,
            "cutoff_date": cutoff_date,
            "pdf_orientation": "landscape",
            "kpis": [
                {"label": "Títulos analizados", "value": len(rows), "numeric_value": len(rows), "format": "int", "highlight": False},
                {"label": "Total ejemplares", "value": total_ej_sum, "numeric_value": total_ej_sum, "format": "int", "highlight": False},
                {"label": "Préstamos del periodo", "value": total_prest_sum, "numeric_value": total_prest_sum, "format": "int", "highlight": False},
                {"label": "Ocupación promedio actual", "value": round(avg_rot * 100, 1), "numeric_value": avg_rot, "format": "percent", "highlight": False},
                {"label": "Sugerencias de compra", "value": recommended_titles, "numeric_value": recommended_titles, "format": "int", "highlight": recommended_titles > 0},
            ],
            "charts": [
                {
                    "id": "chart-rot-prestamos",
                    "type": "bar",
                    "title": "Top Títulos por Préstamos del Periodo",
                    "subtitle": "Mayor demanda real en circulación",
                    "categories": [r["titulo"][:28] for r in top_books] or ["Sin datos"],
                    "series_name": "Préstamos",
                    "values": [r["prestamosPeriodo"] for r in top_books] or [0],
                    "value_format": "int",
                },
                {
                    "id": "chart-rot-cola",
                    "type": "bar",
                    "title": "Solicitudes Activas en Cola de Espera",
                    "subtitle": "Reservas pendientes o aprobadas",
                    "categories": [r["titulo"][:28] for r in top_books] or ["Sin datos"],
                    "series_name": "Solicitudes",
                    "values": [r["colaEspera"] for r in top_books] or [0],
                    "value_format": "int",
                },
            ],
            "columns": [
                {"key": "titulo", "header": "Título", "type": "text", "width_hint": 34, "align": "left"},
                {"key": "autor", "header": "Autor", "type": "text", "width_hint": 24, "align": "left"},
                {"key": "edicion", "header": "Edición", "type": "text", "width_hint": 14, "align": "center"},
                {"key": "dewey", "header": "Clasif. Dewey", "type": "text", "width_hint": 16, "align": "left"},
                {"key": "totalEjemplares", "header": "Ejemplares totales", "type": "int", "width_hint": 16, "align": "right"},
                {"key": "prestamosPeriodo", "header": "Préstamos periodo", "type": "int", "width_hint": 16, "align": "right"},
                {"key": "tasaRotacionRaw", "header": "Ocupación actual", "type": "percent", "width_hint": 16, "align": "right"},
                {"key": "colaEspera", "header": "Cola espera", "type": "int", "width_hint": 13, "align": "right"},
                {"key": "recomendacion", "header": "Sugerencia automática (calculada)", "type": "text", "width_hint": 38, "align": "left"},
            ],
            "rows": rows,
            "total_row": {
                "titulo": "TOTALES",
                "autor": f"{len(rows)} títulos",
                "edicion": "",
                "dewey": "",
                "totalEjemplares": total_ej_sum,
                "prestamosPeriodo": total_prest_sum,
                "tasaRotacionRaw": avg_rot,
                "colaEspera": total_queue,
                "recomendacion": f"{recommended_titles} sugerencias calculadas",
            },
            "recommendations": recs,
            "methodology": {
                "definitions": [
                    "Ocupación actual: Porcentaje de ejemplares del título que actualmente tienen estado 'prestado'.",
                    "Cola de espera: Solicitudes registradas en 'solicitudes_prestamo' con estado 'pendiente' o 'aprobada'.",
                ],
                "formulas": [
                    "Ocupación actual = Ejemplares en estado 'prestado' / Total de ejemplares del título",
                ],
                "rules": [
                    "Regla de sugerencia automática: Se marca 'Evaluar compra' cuando (Préstamos del periodo >= 3 O Cola de espera >= 2) Y Total de ejemplares <= 2.",
                    "Diferenciación: Esta sugerencia es calculada automáticamente y NO representa una decisión de compra aprobada.",
                ],
                "scope": ["Fuente: 'libros', 'ejemplares', 'prestamos' y 'solicitudes_prestamo'."],
                "limitations": ["El sistema no registra tiempos históricos diarios en estantería; la ocupación refleja el estado actual real."],
            },
            "default_file_name": "reporte_frecuencia_consulta_acervo",
        }

    # ------------------------------------------------------------------
    # 6.1 REPORTE DE MOROSIDAD Y PRÉSTAMOS VENCIDOS
    # ------------------------------------------------------------------
    if report_id == "rep-morosidad":
        rows = []
        carrera_delays: Dict[str, int] = {}
        critical_count = 0
        total_delay = 0

        for idx, p in enumerate(prestamos_all):
            if not _in_date_range(p.get("fecha_limite_devolucion"), start_dt, end_dt):
                continue
            status_lbl, delay = _compute_loan_status_and_delay(p, now_ref)
            if status_lbl != "Vencido":
                continue

            u = p.get("usuarios") if isinstance(p.get("usuarios"), dict) else {}
            ej = p.get("ejemplares") if isinstance(p.get("ejemplares"), dict) else {}
            lb = ej.get("libros") if isinstance(ej.get("libros"), dict) else {}
            carrera = _extract_carrera_usuario(u)

            seguimiento = "Retraso crítico (>3 días)" if delay > 3 else "Vencido reciente (0-3 días)"
            row = {
                "folio": _loan_folio(p, idx),
                "matricula": str(u.get("matricula_o_nomina") or "No disponible"),
                "nombre": str(u.get("nombre_completo") or "No disponible"),
                "carrera": carrera,
                "telefono": str(u.get("telefono") or "No disponible"),
                "correo": str(u.get("email") or "No disponible"),
                "libro": str(lb.get("titulo") or "No disponible"),
                "fechaLimite": _fmt_date(p.get("fecha_limite_devolucion")),
                "diasRetraso": delay,
                "seguimiento": seguimiento,
            }
            if _matches_search(row, search_query):
                rows.append(row)
                carrera_delays[carrera] = carrera_delays.get(carrera, 0) + 1
                total_delay += delay
                if delay > 3:
                    critical_count += 1

        avg_delay = round(total_delay / len(rows), 1) if rows else 0.0
        recs = (
            ["No se registran préstamos vencidos en el periodo seleccionado."]
            if not rows
            else [f"Se detectaron {len(rows)} préstamo(s) vencido(s), de los cuales {critical_count} superan los 3 días de retraso."]
        )

        return {
            **meta,
            "period_label": period_label,
            "start_date": start_date or "",
            "end_date": end_date or "",
            "filters_applied": filters_applied,
            "generated_at": generated_at,
            "cutoff_date": cutoff_date,
            "pdf_orientation": "landscape",
            "kpis": [
                {"label": "Alumnos / usuarios vencidos", "value": len(rows), "numeric_value": len(rows), "format": "int", "highlight": len(rows) > 0},
                {"label": "Casos críticos (>3 días)", "value": critical_count, "numeric_value": critical_count, "format": "int", "highlight": critical_count > 0},
                {"label": "Retraso promedio (días)", "value": avg_delay, "numeric_value": avg_delay, "format": "float", "highlight": False},
            ],
            "charts": [
                {
                    "id": "chart-mor-carrera",
                    "type": "bar",
                    "title": "Préstamos Vencidos por Carrera",
                    "subtitle": "Casos activos con fecha límite vencida",
                    "categories": list(carrera_delays.keys()) or ["Sin vencidos"],
                    "series_name": "Vencidos",
                    "values": list(carrera_delays.values()) or [0],
                    "value_format": "int",
                },
                {
                    "id": "chart-mor-dias",
                    "type": "bar",
                    "title": "Días de Retraso por Folio",
                    "subtitle": "Severidad por préstamo vencido",
                    "categories": [r["folio"] for r in rows[:10]] or ["Sin datos"],
                    "series_name": "Días retraso",
                    "values": [r["diasRetraso"] for r in rows[:10]] or [0],
                    "value_format": "int",
                },
            ],
            "columns": [
                {"key": "folio", "header": "Folio", "type": "text", "width_hint": 11, "align": "left"},
                {"key": "matricula", "header": "Matrícula", "type": "text", "width_hint": 16, "align": "left"},
                {"key": "nombre", "header": "Nombre completo", "type": "text", "width_hint": 24, "align": "left"},
                {"key": "carrera", "header": "Carrera", "type": "text", "width_hint": 26, "align": "left"},
                {"key": "telefono", "header": "Teléfono", "type": "text", "width_hint": 15, "align": "left"},
                {"key": "correo", "header": "Correo institucional", "type": "text", "width_hint": 28, "align": "left"},
                {"key": "libro", "header": "Título del libro", "type": "text", "width_hint": 32, "align": "left"},
                {"key": "fechaLimite", "header": "Fecha límite", "type": "date", "width_hint": 14, "align": "center"},
                {"key": "diasRetraso", "header": "Días retraso", "type": "int", "width_hint": 13, "align": "right"},
                {"key": "seguimiento", "header": "Nivel seguimiento", "type": "text", "width_hint": 22, "align": "center"},
            ],
            "rows": rows,
            "total_row": {
                "folio": "TOTALES",
                "matricula": f"{len(rows)} vencidos",
                "nombre": "",
                "carrera": "",
                "telefono": "",
                "correo": "",
                "libro": "",
                "fechaLimite": "",
                "diasRetraso": total_delay,
                "seguimiento": f"{critical_count} críticos (>3d)",
            },
            "recommendations": recs,
            "methodology": {
                "definitions": ["Préstamo vencido: Registro sin 'fecha_devolucion_real' cuya 'fecha_limite_devolucion' es menor o igual a la fecha de corte."],
                "formulas": ["Días de retraso = Parte entera((Fecha actual UTC - fecha_limite_devolucion) / 86400s)"],
                "rules": ["Se clasifica como 'Retraso crítico (>3 días)' cuando días de retraso > 3."],
                "scope": ["Fuente: 'prestamos' unido con 'usuarios', 'carreras', 'ejemplares' y 'libros'."],
                "limitations": ["Si el usuario no tiene teléfono registrado en la tabla 'usuarios', se muestra 'No disponible'."],
            },
            "default_file_name": "reporte_morosidad_prestamos_vencidos",
        }

    # ------------------------------------------------------------------
    # 6.2 REPORTE DE CONVENIOS Y PRÉSTAMOS INTERBIBLIOTECARIOS
    # ------------------------------------------------------------------
    if report_id == "rep-convenios":
        inter_loans = [
            p for p in prestamos_all
            if (p.get("institucion_id") or p.get("instituciones_convenio"))
            and _in_date_range(p.get("fecha_prestamo"), start_dt, end_dt)
        ]

        loans_per_inst: Dict[str, int] = {}
        folios_per_inst: Dict[str, List[str]] = {}
        for p in inter_loans:
            inst_id = str(p.get("institucion_id") or (p.get("instituciones_convenio") or {}).get("id") or "")
            if inst_id:
                loans_per_inst[inst_id] = loans_per_inst.get(inst_id, 0) + 1
                fo = str(p.get("folio_oficio") or "").strip()
                if fo:
                    folios_per_inst.setdefault(inst_id, []).append(fo)

        rows = []
        total_prest_ext = 0
        for inst in instituciones_all:
            inst_id = str(inst.get("id") or "")
            prestados_ext = loans_per_inst.get(inst_id, 0)
            oficios = ", ".join(sorted(set(folios_per_inst.get(inst_id, [])))) or "Sin oficios en periodo"
            contacto = " / ".join([x for x in [inst.get("responsable_email"), inst.get("responsable_telefono")] if x]) or "No disponible"
            row = {
                "institucion": str(inst.get("nombre") or "No disponible"),
                "biblioteca": str(inst.get("nombre_biblioteca") or "No disponible"),
                "claveConvenio": str(inst.get("clave_convenio") or "No disponible"),
                "responsable": str(inst.get("responsable_titular") or "No disponible"),
                "contacto": contacto,
                "folioOficio": oficios,
                "librosPrestados": prestados_ext,
                "librosRecibidos": "No disponible",
                "estado": "Activo" if inst.get("activa", True) else "Inactivo",
            }
            if _matches_search(row, search_query):
                rows.append(row)
                total_prest_ext += prestados_ext

        recs = (
            ["No hay instituciones en convenio registradas."]
            if not rows
            else [f"Se contabilizan {len(rows)} institución(es) en convenio y {total_prest_ext} préstamo(s) interbibliotecario(s) saliente(s) en el periodo."]
        )

        return {
            **meta,
            "period_label": period_label,
            "start_date": start_date or "",
            "end_date": end_date or "",
            "filters_applied": filters_applied,
            "generated_at": generated_at,
            "cutoff_date": cutoff_date,
            "pdf_orientation": "landscape",
            "kpis": [
                {"label": "Instituciones en convenio", "value": len(rows), "numeric_value": len(rows), "format": "int", "highlight": False},
                {"label": "Préstamos externos", "value": total_prest_ext, "numeric_value": total_prest_ext, "format": "int", "highlight": False},
                {"label": "Libros recibidos", "value": "No disponible", "numeric_value": None, "format": "text", "highlight": False},
            ],
            "charts": [
                {
                    "id": "chart-conv-prest",
                    "type": "bar",
                    "title": "Préstamos Externos por Institución",
                    "subtitle": "Material prestado bajo convenio en el periodo",
                    "categories": [r["institucion"][:26] for r in rows] or ["Sin datos"],
                    "series_name": "Préstamos externos",
                    "values": [r["librosPrestados"] for r in rows] or [0],
                    "value_format": "int",
                },
            ],
            "columns": [
                {"key": "institucion", "header": "Institución en convenio", "type": "text", "width_hint": 30, "align": "left"},
                {"key": "biblioteca", "header": "Biblioteca", "type": "text", "width_hint": 24, "align": "left"},
                {"key": "claveConvenio", "header": "Clave convenio", "type": "text", "width_hint": 18, "align": "left"},
                {"key": "responsable", "header": "Responsable titular", "type": "text", "width_hint": 24, "align": "left"},
                {"key": "contacto", "header": "Contacto", "type": "text", "width_hint": 28, "align": "left"},
                {"key": "folioOficio", "header": "Folio(s) oficio", "type": "text", "width_hint": 20, "align": "left"},
                {"key": "librosPrestados", "header": "Libros prestados ext.", "type": "int", "width_hint": 18, "align": "right"},
                {"key": "librosRecibidos", "header": "Libros recibidos", "type": "text", "width_hint": 16, "align": "center"},
                {"key": "estado", "header": "Estado", "type": "text", "width_hint": 12, "align": "center"},
            ],
            "rows": rows,
            "total_row": {
                "institucion": "TOTALES",
                "biblioteca": f"{len(rows)} instituciones",
                "claveConvenio": "",
                "responsable": "",
                "contacto": "",
                "folioOficio": "",
                "librosPrestados": total_prest_ext,
                "librosRecibidos": "No disponible",
                "estado": "",
            },
            "recommendations": recs,
            "methodology": {
                "definitions": ["Préstamos externos: Registros en 'prestamos' vinculados a 'institucion_id' dentro del periodo."],
                "formulas": ["Préstamos externos por institución = Conteo de préstamos salientes asociados"],
                "rules": ["Solo se muestran instituciones existentes en 'instituciones_convenio'."],
                "scope": ["Fuente: 'instituciones_convenio' y 'prestamos'."],
                "limitations": [
                    "La base de datos actual no cuenta con tabla de recepción de libros externos; la columna 'Libros recibidos' se reporta como 'No disponible'."
                ],
            },
            "default_file_name": "reporte_convenios_interbibliotecarios",
        }

    # ------------------------------------------------------------------
    # 6.3 CÉDULA ESTADÍSTICA TRIMESTRAL / SEMESTRAL
    # ------------------------------------------------------------------
    filtered_loans_ced = [
        p for p in prestamos_all
        if _in_date_range(p.get("fecha_prestamo"), start_dt, end_dt)
    ]
    monthly_buckets: Dict[str, Dict[str, Any]] = {}

    for p in filtered_loans_ced:
        dt = _parse_iso_dt(p.get("fecha_prestamo"))
        if not dt:
            continue
        ym = dt.strftime("%Y-%m")
        bucket = monthly_buckets.setdefault(
            ym,
            {
                "periodo": ym,
                "titulos": len(libros_all),
                "volumenes": len(ejemplares_all),
                "usuarios_set": set(),
                "sala": 0,
                "domicilio": 0,
                "renovaciones": 0,
            },
        )
        u_key = str(p.get("usuario_id") or "")
        if u_key:
            bucket["usuarios_set"].add(u_key)
        tp = p.get("tipos_prestamo") if isinstance(p.get("tipos_prestamo"), dict) else {}
        clave = str(tp.get("clave") or p.get("tipo_prestamo") or "domicilio").lower()
        if clave == "sala":
            bucket["sala"] += 1
        else:
            bucket["domicilio"] += 1
        bucket["renovaciones"] += int(p.get("renovaciones_count") or 0)

    rows = []
    for ym in sorted(monthly_buckets.keys()):
        b = monthly_buckets[ym]
        row = {
            "periodo": b["periodo"],
            "titulos": b["titulos"],
            "volumenes": b["volumenes"],
            "usuariosAtendidos": len(b["usuarios_set"]),
            "prestamosSala": b["sala"],
            "prestamosDomicilio": b["domicilio"],
            "totalPrestamos": b["sala"] + b["domicilio"],
            "renovaciones": b["renovaciones"],
        }
        if _matches_search(row, search_query):
            rows.append(row)

    total_sala = sum(r["prestamosSala"] for r in rows)
    total_dom = sum(r["prestamosDomicilio"] for r in rows)
    total_prest = total_sala + total_dom
    total_renov = sum(r["renovaciones"] for r in rows)
    unique_users_ced = len({
        str(p.get("usuario_id"))
        for p in filtered_loans_ced
        if p.get("usuario_id")
    })
    pct_dom = (total_dom / total_prest) if total_prest > 0 else 0.0

    recs = (
        ["Sin datos de circulación en el periodo para construir la cédula estadística."]
        if not rows
        else [f"Cédula oficial con {len(libros_all)} título(s), {len(ejemplares_all)} volumen(es) y {total_prest} préstamo(s) en el periodo."]
    )

    return {
        **meta,
        "period_label": period_label,
        "start_date": start_date or "",
        "end_date": end_date or "",
        "filters_applied": filters_applied,
        "generated_at": generated_at,
        "cutoff_date": cutoff_date,
        "pdf_orientation": "portrait",
        "kpis": [
            {"label": "Total de títulos", "value": len(libros_all), "numeric_value": len(libros_all), "format": "int", "highlight": False},
            {"label": "Total de volúmenes", "value": len(ejemplares_all), "numeric_value": len(ejemplares_all), "format": "int", "highlight": False},
            {"label": "Usuarios atendidos", "value": unique_users_ced, "numeric_value": unique_users_ced, "format": "int", "highlight": False},
            {"label": "Préstamos en sala", "value": total_sala, "numeric_value": total_sala, "format": "int", "highlight": False},
            {"label": "Préstamos a domicilio", "value": total_dom, "numeric_value": total_dom, "format": "int", "highlight": False},
            {"label": "% Domicilio", "value": round(pct_dom * 100, 1), "numeric_value": pct_dom, "format": "percent", "highlight": True},
        ],
        "charts": [
            {
                "id": "chart-ced-mes",
                "type": "line",
                "title": "Usuarios Atendidos por Mes",
                "subtitle": "Usuarios únicos con préstamo por mes",
                "categories": [r["periodo"] for r in rows] or ["Sin datos"],
                "series_name": "Usuarios",
                "values": [r["usuariosAtendidos"] for r in rows] or [0],
                "value_format": "int",
            },
            {
                "id": "chart-ced-mod",
                "type": "bar",
                "title": "Préstamos Sala vs. Domicilio",
                "subtitle": "Comparativo del periodo",
                "categories": ["En Sala", "A Domicilio"],
                "series_name": "Préstamos",
                "values": [total_sala, total_dom],
                "value_format": "int",
            },
        ],
        "columns": [
            {"key": "periodo", "header": "Mes", "type": "text", "width_hint": 14, "align": "center"},
            {"key": "titulos", "header": "Títulos", "type": "int", "width_hint": 12, "align": "right"},
            {"key": "volumenes", "header": "Volúmenes", "type": "int", "width_hint": 13, "align": "right"},
            {"key": "usuariosAtendidos", "header": "Usuarios atendidos", "type": "int", "width_hint": 18, "align": "right"},
            {"key": "prestamosSala", "header": "Sala", "type": "int", "width_hint": 12, "align": "right"},
            {"key": "prestamosDomicilio", "header": "Domicilio", "type": "int", "width_hint": 13, "align": "right"},
            {"key": "totalPrestamos", "header": "Total préstamos", "type": "int", "width_hint": 16, "align": "right"},
            {"key": "renovaciones", "header": "Renovaciones", "type": "int", "width_hint": 14, "align": "right"},
        ],
        "rows": rows,
        "total_row": {
            "periodo": "TOTAL PERIODO",
            "titulos": len(libros_all),
            "volumenes": len(ejemplares_all),
            "usuariosAtendidos": unique_users_ced,
            "prestamosSala": total_sala,
            "prestamosDomicilio": total_dom,
            "totalPrestamos": total_prest,
            "renovaciones": total_renov,
        },
        "recommendations": recs,
        "methodology": {
            "definitions": [
                "Total de títulos y volúmenes: Conteo real actual en 'libros' y 'ejemplares'.",
                "Usuarios atendidos: Usuarios distintos con al menos un préstamo registrado en cada mes.",
            ],
            "formulas": ["% Domicilio = Préstamos a domicilio / (Préstamos en sala + Préstamos a domicilio)"],
            "rules": ["Los meses se agrupan según 'fecha_prestamo' (YYYY-MM)."],
            "scope": ["Fuente: 'libros', 'ejemplares', 'prestamos' y 'tipos_prestamo'."],
            "limitations": ["Los conteos de títulos y volúmenes por mes reflejan el inventario catalogado actual."],
        },
        "default_file_name": "cedula_estadistica_servicios_bibliotecarios",
    }
