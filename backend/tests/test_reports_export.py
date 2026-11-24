from io import BytesIO
from unittest.mock import AsyncMock, patch
import pytest
from openpyxl import load_workbook

from app.services.report_builder import REPORT_CATALOG, build_report_model
from app.services.report_exporters import export_report_to_pdf, export_report_to_xlsx


SAMPLE_SOURCES = {
    "prestamos": [
        {
            "id": "p-1",
            "usuario_id": "u-1",
            "ejemplar_id": "e-1",
            "tipo_prestamo": "domicilio",
            "fecha_prestamo": "2026-11-10T12:00:00+00:00",
            "fecha_limite_devolucion": "2026-11-15T12:00:00+00:00",
            "fecha_devolucion_real": None,
            "estado": "vencido",
            "renovaciones_count": 1,
            "institucion_id": "inst-1",
            "folio_oficio": "OF-2026-01",
            "tipos_prestamo": {"id": "tp-1", "clave": "domicilio", "nombre": "Domicilio"},
            "usuarios": {
                "id": "u-1",
                "nombre_completo": "Alumno Prueba Real",
                "email": "alumno@upd.edu.mx",
                "matricula_o_nomina": "20230001",
                "telefono": "6181234567",
                "rol": "lector",
                "carreras": {"id": 1, "nivel": "Ing", "nombre": "Ing. en TI"},
                "tipos_usuario": {"nombre": "Alumno"},
            },
            "instituciones_convenio": {
                "id": "inst-1",
                "nombre": "UJED",
                "nombre_biblioteca": "Biblioteca Central",
            },
            "ejemplares": {
                "id": "e-1",
                "estado": "prestado",
                "codigo_inventario": "INV-001",
                "ubicacion_estante": "Estante A-1",
                "libros": {
                    "id": "l-1",
                    "titulo": "Clean Code: A Handbook of Agile Software Craftsmanship with Very Long Subtitle",
                    "isbn": "9780132350884",
                    "edicion": "1a",
                    "anio_publicacion": 2008,
                    "clasificacion_dewey": "005.1",
                    "editoriales": {"nombre": "Prentice Hall"},
                    "libro_autores": [{"autores": {"nombre": "Robert C. Martin"}}],
                },
            },
        }
    ],
    "sanciones": [
        {
            "id": "s-1",
            "usuario_id": "u-1",
            "tipo_sancion": "multa",
            "monto_multa": 45.0,
            "estado_pago": "pendiente",
            "motivo": "Retraso en devolución",
            "created_at": "2026-11-20T10:00:00+00:00",
            "usuarios": {
                "nombre_completo": "Alumno Prueba Real",
                "email": "alumno@upd.edu.mx",
                "matricula_o_nomina": "20230001",
                "carreras": {"nombre": "Ing. en TI"},
            },
        }
    ],
    "libros": [
        {
            "id": "l-1",
            "isbn": "9780132350884",
            "titulo": "Clean Code: A Handbook of Agile Software Craftsmanship with Very Long Subtitle",
            "anio_publicacion": 2008,
            "edicion": "1a",
            "clasificacion_dewey": "005.1",
            "created_at": "2026-01-15T10:00:00+00:00",
            "editoriales": {"nombre": "Prentice Hall"},
            "libro_autores": [{"autores": {"nombre": "Robert C. Martin"}}],
            "ejemplares": [
                {
                    "id": "e-1",
                    "codigo_inventario": "INV-001",
                    "estado": "prestado",
                    "ubicacion_estante": "Estante A-1",
                    "observaciones": None,
                    "created_at": "2026-01-15T10:00:00+00:00",
                }
            ],
        }
    ],
    "ejemplares": [
        {
            "id": "e-1",
            "libro_id": "l-1",
            "codigo_inventario": "INV-001",
            "estado": "prestado",
            "ubicacion_estante": "Estante A-1",
            "observaciones": None,
            "created_at": "2026-01-15T10:00:00+00:00",
            "libros": {
                "id": "l-1",
                "isbn": "9780132350884",
                "titulo": "Clean Code: A Handbook of Agile Software Craftsmanship with Very Long Subtitle",
                "anio_publicacion": 2008,
                "edicion": "1a",
                "clasificacion_dewey": "005.1",
                "editoriales": {"nombre": "Prentice Hall"},
                "libro_autores": [{"autores": {"nombre": "Robert C. Martin"}}],
            },
        }
    ],
    "solicitudes": [
        {
            "id": "sol-1",
            "folio": "SOL-001",
            "usuario_id": "u-1",
            "libro_id": "l-1",
            "fecha_solicitud": "2026-11-18T10:00:00+00:00",
            "estado": "pendiente",
        }
    ],
    "instituciones": [
        {
            "id": "inst-1",
            "nombre": "UJED",
            "nombre_biblioteca": "Biblioteca Central",
            "clave_convenio": "CONV-01",
            "responsable_titular": "Dra. Ana",
            "responsable_email": "ana@ujed.mx",
            "responsable_telefono": "6180000000",
            "activa": True,
        }
    ],
}


@pytest.mark.asyncio
@pytest.mark.parametrize("report_meta", REPORT_CATALOG)
async def test_all_reports_excel_and_pdf_export(report_meta):
    with patch(
        "app.services.report_builder._fetch_supabase_report_sources",
        new=AsyncMock(return_value=SAMPLE_SOURCES),
    ):
        model = await build_report_model(
            report_id=report_meta["id"],
            start_date="2026-01-01",
            end_date="2026-12-31",
            search_query="",
        )

    assert model["code"] == report_meta["code"]
    assert "SIABUC" not in model["title"].upper()

    # Validar Excel (.xlsx)
    xlsx_bytes = export_report_to_xlsx(model)
    wb = load_workbook(BytesIO(xlsx_bytes))
    assert wb.sheetnames == ["Resumen", "Detalle", "Criterios"]

    ws_res = wb["Resumen"]
    assert len(ws_res._charts) >= 1  # Gráficas nativas de Excel

    ws_det = wb["Detalle"]
    assert ws_det.freeze_panes == "A2"
    assert ws_det.auto_filter.ref is not None

    # Validar PDF (.pdf)
    pdf_bytes = export_report_to_pdf(model)
    assert pdf_bytes.startswith(b"%PDF-")
    assert len(pdf_bytes) > 1500


@pytest.mark.asyncio
async def test_empty_period_shows_sin_datos():
    with patch(
        "app.services.report_builder._fetch_supabase_report_sources",
        new=AsyncMock(return_value=SAMPLE_SOURCES),
    ):
        model = await build_report_model(
            report_id="rep-carreras",
            start_date="2020-01-01",
            end_date="2020-01-31",
            search_query="",
        )

    assert model["rows"] == []
    xlsx_bytes = export_report_to_xlsx(model)
    wb = load_workbook(BytesIO(xlsx_bytes))
    assert wb["Detalle"]["A2"].value == "Sin datos para el periodo"

    pdf_bytes = export_report_to_pdf(model)
    assert pdf_bytes.startswith(b"%PDF-")
