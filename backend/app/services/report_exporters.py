from __future__ import annotations

from io import BytesIO
from typing import Any, Dict, List

from openpyxl import Workbook
from openpyxl.chart import BarChart, LineChart, Reference
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter

from reportlab.lib import colors
from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


# ==============================================================================
# EXPORTADOR EXCEL (.xlsx) — 3 HOJAS CON GRÁFICAS NATIVAS
# ==============================================================================

_BLUE_DARK = "1E3A5F"
_BLUE_ACCENT = "2563EB"
_BLUE_LIGHT = "EFF6FF"
_ALT_ROW = "F8FAFC"
_BORDER_GRAY = "CBD5E1"
_TOTAL_BG = "DBEAFE"
_ALERT_BG = "FEF3C7"
_ALERT_TEXT = "B45309"


def _thin_border() -> Border:
    side = Side(style="thin", color=_BORDER_GRAY)
    return Border(left=side, right=side, top=side, bottom=side)


def _apply_number_format(cell, col_type: str, value: Any) -> None:
    if value is None or isinstance(value, str):
        return
    if col_type == "currency":
        cell.number_format = "$#,##0.00"
    elif col_type == "percent":
        cell.number_format = "0.0%"
    elif col_type == "int":
        cell.number_format = "#,##0"
    elif col_type == "float":
        cell.number_format = "#,##0.00"


def export_report_to_xlsx(model: Dict[str, Any]) -> bytes:
    wb = Workbook()

    # ------------------------------------------------------------------
    # HOJA 1: RESUMEN
    # ------------------------------------------------------------------
    ws_res = wb.active
    ws_res.title = "Resumen"
    ws_res.views.sheetView[0].showGridLines = True

    title_font = Font(name="Calibri", size=14, bold=True, color="FFFFFF")
    sub_font = Font(name="Calibri", size=10, bold=False, color="1E293B")
    section_font = Font(name="Calibri", size=11, bold=True, color=_BLUE_DARK)
    header_font = Font(name="Calibri", size=10, bold=True, color="FFFFFF")
    bold_font = Font(name="Calibri", size=10, bold=True, color="0F172A")
    regular_font = Font(name="Calibri", size=10, color="1E293B")

    header_fill = PatternFill(start_color=_BLUE_DARK, end_color=_BLUE_DARK, fill_type="solid")
    sub_header_fill = PatternFill(start_color=_BLUE_ACCENT, end_color=_BLUE_ACCENT, fill_type="solid")
    kpi_fill = PatternFill(start_color=_BLUE_LIGHT, end_color=_BLUE_LIGHT, fill_type="solid")
    alt_fill = PatternFill(start_color=_ALT_ROW, end_color=_ALT_ROW, fill_type="solid")
    border = _thin_border()

    # Encabezado Institucional
    ws_res.merge_cells("A1:H1")
    ws_res["A1"] = "UNIVERSIDAD POLITÉCNICA DE DURANGO — SISTEMA DE ACERVO BIBLIOTECARIO"
    ws_res["A1"].font = title_font
    ws_res["A1"].fill = header_fill
    ws_res["A1"].alignment = Alignment(horizontal="left", vertical="center", indent=1)
    ws_res.row_dimensions[1].height = 28

    ws_res.merge_cells("A2:H2")
    ws_res["A2"] = f"{model['title']} ({model['code']})"
    ws_res["A2"].font = Font(name="Calibri", size=12, bold=True, color=_BLUE_DARK)
    ws_res["A2"].fill = kpi_fill
    ws_res["A2"].alignment = Alignment(horizontal="left", vertical="center", indent=1)
    ws_res.row_dimensions[2].height = 22

    meta_rows = [
        ("Periodo consultado:", model["period_label"], "Fecha de generación:", model["generated_at"]),
        ("Fecha de corte:", model["cutoff_date"], "Categoría:", model["badge"]),
    ]
    for r_idx, (l1, v1, l2, v2) in enumerate(meta_rows, start=3):
        ws_res.cell(row=r_idx, column=1, value=l1).font = bold_font
        c_v1 = ws_res.cell(row=r_idx, column=2, value=v1)
        c_v1.font = sub_font
        c_v1.alignment = Alignment(wrap_text=True, vertical="center")
        ws_res.cell(row=r_idx, column=4, value=l2).font = bold_font
        ws_res.merge_cells(start_row=r_idx, start_column=5, end_row=r_idx, end_column=8)
        c_v2 = ws_res.cell(row=r_idx, column=5, value=v2)
        c_v2.font = sub_font
        c_v2.alignment = Alignment(wrap_text=True, vertical="center")

    # Indicadores principales
    row_cursor = 6
    ws_res.cell(row=row_cursor, column=1, value="INDICADORES PRINCIPALES").font = section_font
    row_cursor += 1

    ws_res.cell(row=row_cursor, column=1, value="Indicador").font = header_font
    ws_res.cell(row=row_cursor, column=1).fill = sub_header_fill
    ws_res.cell(row=row_cursor, column=1).border = border
    ws_res.cell(row=row_cursor, column=2, value="Valor").font = header_font
    ws_res.cell(row=row_cursor, column=2).fill = sub_header_fill
    ws_res.cell(row=row_cursor, column=2).border = border
    ws_res.cell(row=row_cursor, column=2).alignment = Alignment(horizontal="right")
    row_cursor += 1

    for idx, kpi in enumerate(model.get("kpis", [])):
        c_lbl = ws_res.cell(row=row_cursor, column=1, value=kpi["label"])
        c_lbl.font = bold_font
        c_lbl.border = border

        fmt = kpi.get("format", "text")
        raw_val = kpi.get("numeric_value") if kpi.get("numeric_value") is not None else kpi.get("value")
        c_val = ws_res.cell(row=row_cursor, column=2, value=raw_val)
        c_val.font = bold_font if kpi.get("highlight") else regular_font
        c_val.border = border
        c_val.alignment = Alignment(horizontal="right" if fmt != "text" else "left")
        _apply_number_format(c_val, fmt, raw_val)

        if kpi.get("highlight"):
            c_lbl.fill = PatternFill(start_color=_ALERT_BG, end_color=_ALERT_BG, fill_type="solid")
            c_val.fill = PatternFill(start_color=_ALERT_BG, end_color=_ALERT_BG, fill_type="solid")
            c_val.font = Font(name="Calibri", size=10, bold=True, color=_ALERT_TEXT)
        elif idx % 2 == 1:
            c_lbl.fill = alt_fill
            c_val.fill = alt_fill
        row_cursor += 1

    # Recomendaciones y hallazgos breves (contenidos en A:B para no chocar con gráficas en D)
    row_cursor += 1
    ws_res.cell(row=row_cursor, column=1, value="HALLAZGOS Y RECOMENDACIONES").font = section_font
    row_cursor += 1
    for rec in model.get("recommendations", []):
        ws_res.merge_cells(start_row=row_cursor, start_column=1, end_row=row_cursor, end_column=2)
        c_rec = ws_res.cell(row=row_cursor, column=1, value=f"• {rec}")
        c_rec.font = regular_font
        c_rec.alignment = Alignment(wrap_text=True, vertical="top")
        ws_res.row_dimensions[row_cursor].height = 30
        row_cursor += 1

    # Datos y Gráficas nativas de Excel
    row_cursor += 1
    chart_anchor_col = 4
    chart_anchor_row = 6

    for chart_spec in model.get("charts", []):
        ws_res.cell(row=row_cursor, column=1, value=chart_spec["title"]).font = section_font
        row_cursor += 1

        hdr_row = row_cursor
        c_cat_hdr = ws_res.cell(row=hdr_row, column=1, value="Categoría")
        c_val_hdr = ws_res.cell(row=hdr_row, column=2, value=chart_spec.get("series_name", "Valor"))
        for hc in (c_cat_hdr, c_val_hdr):
            hc.font = header_font
            hc.fill = sub_header_fill
            hc.border = border
        row_cursor += 1

        cats = chart_spec.get("categories", []) or ["Sin datos"]
        vals = chart_spec.get("values", []) or [0]
        v_fmt = chart_spec.get("value_format", "int")

        data_start = row_cursor
        for c_name, v_num in zip(cats, vals):
            cc = ws_res.cell(row=row_cursor, column=1, value=str(c_name))
            cv = ws_res.cell(row=row_cursor, column=2, value=v_num)
            cc.font = regular_font
            cv.font = regular_font
            cc.border = border
            cv.border = border
            _apply_number_format(cv, v_fmt, v_num)
            row_cursor += 1
        data_end = row_cursor - 1

        # Gráfica nativa de Excel (BarChart o LineChart)
        if chart_spec.get("type") == "line":
            xl_chart = LineChart()
        else:
            xl_chart = BarChart()
            xl_chart.type = "col"
            xl_chart.style = 10

        xl_chart.title = chart_spec["title"]
        xl_chart.y_axis.title = chart_spec.get("series_name", "Valor")
        xl_chart.x_axis.delete = False
        xl_chart.y_axis.delete = False
        xl_chart.legend = None
        xl_chart.width = 16
        xl_chart.height = 8.5

        data_ref = Reference(ws_res, min_col=2, min_row=hdr_row, max_row=data_end)
        cats_ref = Reference(ws_res, min_col=1, min_row=data_start, max_row=data_end)
        xl_chart.add_data(data_ref, titles_from_data=True)
        xl_chart.set_categories(cats_ref)

        ws_res.add_chart(xl_chart, f"{get_column_letter(chart_anchor_col)}{chart_anchor_row}")
        chart_anchor_row += 18
        row_cursor += 1

    ws_res.column_dimensions["A"].width = 36
    ws_res.column_dimensions["B"].width = 38
    ws_res.column_dimensions["C"].width = 4
    ws_res.column_dimensions["D"].width = 20
    ws_res.column_dimensions["E"].width = 20
    ws_res.column_dimensions["F"].width = 20
    ws_res.column_dimensions["G"].width = 16
    ws_res.column_dimensions["H"].width = 16

    # ------------------------------------------------------------------
    # HOJA 2: DETALLE
    # ------------------------------------------------------------------
    ws_det = wb.create_sheet(title="Detalle")
    ws_det.views.sheetView[0].showGridLines = True

    columns: List[Dict[str, Any]] = model.get("columns", [])
    rows: List[Dict[str, Any]] = model.get("rows", [])
    total_row: Dict[str, Any] = model.get("total_row") or {}

    # Encabezados en fila 1
    for col_idx, col_def in enumerate(columns, start=1):
        cell = ws_det.cell(row=1, column=col_idx, value=col_def["header"])
        cell.font = header_font
        cell.fill = header_fill
        cell.border = border
        cell.alignment = Alignment(horizontal=col_def.get("align", "left"), vertical="center", wrap_text=True)
    ws_det.row_dimensions[1].height = 24

    # Inmovilizar primera fila y activar filtros automáticos
    ws_det.freeze_panes = "A2"
    last_col_letter = get_column_letter(max(len(columns), 1))

    if not rows:
        ws_det.merge_cells(start_row=2, start_column=1, end_row=2, end_column=max(len(columns), 1))
        empty_cell = ws_det.cell(row=2, column=1, value="Sin datos para el periodo")
        empty_cell.font = regular_font
        empty_cell.alignment = Alignment(horizontal="center", vertical="center")
        ws_det.auto_filter.ref = f"A1:{last_col_letter}2"
    else:
        for r_offset, row_data in enumerate(rows, start=2):
            is_alt = r_offset % 2 == 1
            for col_idx, col_def in enumerate(columns, start=1):
                val = row_data.get(col_def["key"], "")
                cell = ws_det.cell(row=r_offset, column=col_idx, value=val)
                cell.font = regular_font
                cell.border = border
                cell.alignment = Alignment(
                    horizontal=col_def.get("align", "left"),
                    vertical="center",
                    wrap_text=True,
                )
                if is_alt:
                    cell.fill = alt_fill
                _apply_number_format(cell, col_def.get("type", "text"), val)

        last_data_row = len(rows) + 1
        ws_det.auto_filter.ref = f"A1:{last_col_letter}{last_data_row}"

        if total_row:
            tot_r = last_data_row + 1
            tot_fill = PatternFill(start_color=_TOTAL_BG, end_color=_TOTAL_BG, fill_type="solid")
            for col_idx, col_def in enumerate(columns, start=1):
                val = total_row.get(col_def["key"], "")
                cell = ws_det.cell(row=tot_r, column=col_idx, value=val)
                cell.font = bold_font
                cell.fill = tot_fill
                cell.border = border
                cell.alignment = Alignment(horizontal=col_def.get("align", "left"), vertical="center")
                _apply_number_format(cell, col_def.get("type", "text"), val)

    # Anchos adecuados de columna
    for col_idx, col_def in enumerate(columns, start=1):
        hint = int(col_def.get("width_hint", 18))
        max_len = max(len(col_def["header"]) + 4, hint)
        for row_data in rows[:200]:
            v_str = str(row_data.get(col_def["key"], "") or "")
            max_len = max(max_len, min(len(v_str) + 3, 45))
        ws_det.column_dimensions[get_column_letter(col_idx)].width = max_len

    # ------------------------------------------------------------------
    # HOJA 3: CRITERIOS
    # ------------------------------------------------------------------
    ws_cri = wb.create_sheet(title="Criterios")
    ws_cri.views.sheetView[0].showGridLines = True

    ws_cri.merge_cells("A1:C1")
    ws_cri["A1"] = f"CRITERIOS METODOLÓGICOS Y ALCANCE — {model['title'].upper()}"
    ws_cri["A1"].font = title_font
    ws_cri["A1"].fill = header_fill
    ws_cri["A1"].alignment = Alignment(horizontal="left", vertical="center", indent=1)
    ws_cri.row_dimensions[1].height = 26

    cri_row = 3
    sections = [
        ("FILTROS APLICADOS Y CORTE", [f"{f['label']}: {f['value']}" for f in model.get("filters_applied", [])] + [f"Fecha de corte: {model['cutoff_date']}", f"Fecha de generación: {model['generated_at']}"]),
        ("DEFINICIÓN DE INDICADORES", model.get("methodology", {}).get("definitions", [])),
        ("FÓRMULAS UTILIZADAS", model.get("methodology", {}).get("formulas", [])),
        ("REGLAS PARA SUGERENCIAS", model.get("methodology", {}).get("rules", [])),
        ("ALCANCE DE LOS DATOS", model.get("methodology", {}).get("scope", [])),
        ("LIMITACIONES DOCUMENTADAS (CAMPOS NO DISPONIBLES)", model.get("methodology", {}).get("limitations", [])),
    ]

    for sec_title, items in sections:
        c_sec = ws_cri.cell(row=cri_row, column=1, value=sec_title)
        c_sec.font = section_font
        c_sec.fill = kpi_fill
        c_sec.border = border
        ws_cri.merge_cells(start_row=cri_row, start_column=1, end_row=cri_row, end_column=3)
        cri_row += 1
        if not items:
            ws_cri.cell(row=cri_row, column=1, value="Sin observaciones adicionales.").font = regular_font
            cri_row += 1
        else:
            for item in items:
                ws_cri.merge_cells(start_row=cri_row, start_column=1, end_row=cri_row, end_column=3)
                c_item = ws_cri.cell(row=cri_row, column=1, value=f"• {item}")
                c_item.font = regular_font
                c_item.alignment = Alignment(wrap_text=True)
                cri_row += 1
        cri_row += 1

    ws_cri.column_dimensions["A"].width = 45
    ws_cri.column_dimensions["B"].width = 45
    ws_cri.column_dimensions["C"].width = 30

    buf = BytesIO()
    wb.save(buf)
    buf.seek(0)
    return buf.getvalue()


# ==============================================================================
# EXPORTADOR PDF (.pdf) — PLANTILLA INDEPENDIENTE MULTIPÁGINA
# ==============================================================================

class _NumberedCanvas(canvas.Canvas):
    """Canvas con encabezado institucional y numeración 'Página X de Y' en todas las páginas."""

    def __init__(self, *args, report_meta: Dict[str, Any] | None = None, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states: List[Dict[str, Any]] = []
        self._report_meta = report_meta or {}

    def showPage(self) -> None:
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self) -> None:
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self._draw_running_chrome(num_pages)
            super().showPage()
        super().save()

    def _draw_running_chrome(self, page_count: int) -> None:
        page_w, page_h = self._pagesize
        margin = 0.45 * inch

        # Encabezado repetido en todas las páginas
        self.saveState()
        self.setStrokeColor(colors.HexColor("#1E3A5F"))
        self.setLineWidth(1)
        self.line(margin, page_h - 0.42 * inch, page_w - margin, page_h - 0.42 * inch)

        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#1E3A5F"))
        self.drawString(margin, page_h - 0.34 * inch, "UNIVERSIDAD POLITÉCNICA DE DURANGO — SISTEMA DE ACERVO BIBLIOTECARIO")

        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#475569"))
        code_txt = f"{self._report_meta.get('code', '')} | {self._report_meta.get('period_label', '')}"
        self.drawRightString(page_w - margin, page_h - 0.34 * inch, code_txt)

        # Pie de página repetido con fecha de generación y Página X de Y
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.6)
        self.line(margin, 0.42 * inch, page_w - margin, 0.42 * inch)

        self.setFont("Helvetica", 7.5)
        self.setFillColor(colors.HexColor("#64748B"))
        gen_txt = f"Generado: {self._report_meta.get('generated_at', '')}  |  Corte: {self._report_meta.get('cutoff_date', '')}"
        self.drawString(margin, 0.28 * inch, gen_txt)
        self.drawRightString(page_w - margin, 0.28 * inch, f"Página {self._pageNumber} de {page_count}")
        self.restoreState()


def _format_pdf_value(col_type: str, value: Any) -> str:
    if value is None:
        return "No disponible"
    if isinstance(value, (int, float)):
        if col_type == "currency":
            return f"${value:,.2f}"
        if col_type == "percent":
            return f"{value * 100:.1f}%"
        if col_type == "int":
            return f"{int(value):,}"
        if col_type == "float":
            return f"{value:,.2f}"
    return str(value)


def export_report_to_pdf(model: Dict[str, Any]) -> bytes:
    buf = BytesIO()
    is_landscape = model.get("pdf_orientation") == "landscape"
    pagesize = landscape(letter) if is_landscape else letter

    margin = 0.45 * inch
    doc = SimpleDocTemplate(
        buf,
        pagesize=pagesize,
        leftMargin=margin,
        rightMargin=margin,
        topMargin=0.60 * inch,
        bottomMargin=0.58 * inch,
        title=model.get("title", "Reporte Acervo"),
    )

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "ReportTitle",
        parent=styles["Heading1"],
        fontName="Helvetica-Bold",
        fontSize=15,
        textColor=colors.HexColor("#1E3A5F"),
        spaceAfter=4,
    )
    subtitle_style = ParagraphStyle(
        "ReportSubtitle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=9,
        textColor=colors.HexColor("#475569"),
        spaceAfter=10,
    )
    sec_style = ParagraphStyle(
        "SectionHdr",
        parent=styles["Heading2"],
        fontName="Helvetica-Bold",
        fontSize=10.5,
        textColor=colors.HexColor("#1E3A5F"),
        spaceBefore=8,
        spaceAfter=5,
    )
    cell_style = ParagraphStyle(
        "CellText",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=7.2,
        leading=9.2,
        textColor=colors.HexColor("#0F172A"),
    )
    cell_bold_style = ParagraphStyle(
        "CellTextBold",
        parent=cell_style,
        fontName="Helvetica-Bold",
    )
    hdr_cell_style = ParagraphStyle(
        "HdrCell",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=7.2,
        leading=9.0,
        textColor=colors.white,
    )
    note_style = ParagraphStyle(
        "NoteText",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8.2,
        leading=11,
        textColor=colors.HexColor("#334155"),
        spaceAfter=3,
    )

    avail_width = pagesize[0] - (2 * margin)
    story: List[Any] = []

    # ------------------------------------------------------------------
    # PÁGINA 1: RESUMEN EJECUTIVO
    # ------------------------------------------------------------------
    story.append(Paragraph(model["title"].upper(), title_style))
    story.append(Paragraph(model.get("description", ""), subtitle_style))

    # Metadatos
    meta_table = Table(
        [
            [
                Paragraph("<b>Código:</b> " + str(model["code"]), note_style),
                Paragraph("<b>Periodo:</b> " + str(model["period_label"]), note_style),
                Paragraph("<b>Fecha de corte:</b> " + str(model["cutoff_date"]), note_style),
            ],
            [
                Paragraph("<b>Generación:</b> " + str(model["generated_at"]), note_style),
                Paragraph("<b>Búsqueda:</b> " + str(model["filters_applied"][1]["value"]), note_style),
                Paragraph("<b>Registros:</b> " + str(len(model.get("rows", []))), note_style),
            ],
        ],
        colWidths=[avail_width * 0.30, avail_width * 0.42, avail_width * 0.28],
    )
    meta_table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#EFF6FF")),
                ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#BFDBFE")),
                ("INNERGRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#DBEAFE")),
                ("TOPPADDING", (0, 0), (-1, -1), 5),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    story.append(meta_table)
    story.append(Spacer(1, 10))

    # KPIs principales
    story.append(Paragraph("INDICADORES PRINCIPALES", sec_style))
    kpis = model.get("kpis", [])
    if kpis:
        kpi_headers = [Paragraph(f"<b>{k['label']}</b>", hdr_cell_style) for k in kpis]
        kpi_vals = []
        kpi_styles = [
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1E3A5F")),
            ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#CBD5E1")),
            ("INNERGRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#CBD5E1")),
            ("TOPPADDING", (0, 0), (-1, -1), 6),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
            ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ]
        for idx, k in enumerate(kpis):
            raw_v = k.get("numeric_value") if k.get("numeric_value") is not None else k.get("value")
            txt_v = _format_pdf_value(k.get("format", "text"), raw_v)
            val_p = Paragraph(
                f"<b>{txt_v}</b>",
                ParagraphStyle(
                    f"KpiVal{idx}",
                    parent=cell_bold_style,
                    fontSize=10,
                    alignment=1,
                    textColor=colors.HexColor("#B45309") if k.get("highlight") else colors.HexColor("#1E3A5F"),
                ),
            )
            kpi_vals.append(val_p)
            if k.get("highlight"):
                kpi_styles.append(("BACKGROUND", (idx, 1), (idx, 1), colors.HexColor("#FEF3C7")))

        col_w = avail_width / len(kpis)
        kpi_tbl = Table([kpi_headers, kpi_vals], colWidths=[col_w] * len(kpis))
        kpi_tbl.setStyle(TableStyle(kpi_styles))
        story.append(kpi_tbl)
        story.append(Spacer(1, 10))

    # Resumen de gráficas (tabla ejecutiva limpia)
    for ch in model.get("charts", []):
        story.append(Paragraph(f"{ch['title']} — {ch.get('subtitle', '')}", sec_style))
        ch_rows = [[
            Paragraph("<b>Categoría</b>", hdr_cell_style),
            Paragraph(f"<b>{ch.get('series_name', 'Valor')}</b>", hdr_cell_style),
        ]]
        for cat, val in zip(ch.get("categories", []), ch.get("values", [])):
            ch_rows.append([
                Paragraph(str(cat), cell_style),
                Paragraph(_format_pdf_value(ch.get("value_format", "int"), val), cell_bold_style),
            ])
        ch_tbl = Table(ch_rows, colWidths=[avail_width * 0.72, avail_width * 0.28])
        ch_tbl.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#2563EB")),
                    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#F8FAFC")]),
                    ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5E1")),
                    ("INNERGRID", (0, 0), (-1, -1), 0.3, colors.HexColor("#E2E8F0")),
                    ("TOPPADDING", (0, 0), (-1, -1), 4),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
                ]
            )
        )
        story.append(ch_tbl)
        story.append(Spacer(1, 8))

    # Recomendaciones
    recs = model.get("recommendations", [])
    if recs:
        story.append(Paragraph("HALLAZGOS Y RECOMENDACIONES", sec_style))
        for r in recs:
            story.append(Paragraph(f"• {r}", note_style))

    # ------------------------------------------------------------------
    # PÁGINAS SIGUIENTES: DETALLE COMPLETO (ENCABEZADOS REPETIDOS)
    # ------------------------------------------------------------------
    story.append(PageBreak())
    story.append(Paragraph("DETALLE COMPLETO DE REGISTROS", sec_style))

    columns = model.get("columns", [])
    rows = model.get("rows", [])
    total_row = model.get("total_row") or {}

    if not rows:
        story.append(Spacer(1, 14))
        story.append(Paragraph("<b>Sin datos para el periodo</b>", note_style))
    else:
        total_hint = sum(float(c.get("width_hint", 16)) for c in columns) or 1.0
        col_widths = [(float(c.get("width_hint", 16)) / total_hint) * avail_width for c in columns]

        tbl_data = [
            [Paragraph(f"<b>{c['header']}</b>", hdr_cell_style) for c in columns]
        ]
        for row_data in rows:
            pdf_row = []
            for c in columns:
                txt = _format_pdf_value(c.get("type", "text"), row_data.get(c["key"], "No disponible"))
                p_style = cell_style
                if "vencido" in txt.lower() or "crítico" in txt.lower() or "pendiente" in txt.lower():
                    p_style = ParagraphStyle(
                        "AlertCell",
                        parent=cell_bold_style,
                        textColor=colors.HexColor("#B91C1C"),
                    )
                pdf_row.append(Paragraph(txt, p_style))
            tbl_data.append(pdf_row)

        if total_row:
            tot_pdf_row = [
                Paragraph(
                    f"<b>{_format_pdf_value(c.get('type', 'text'), total_row.get(c['key'], ''))}</b>",
                    cell_bold_style,
                )
                for c in columns
            ]
            tbl_data.append(tot_pdf_row)

        detail_tbl = Table(tbl_data, colWidths=col_widths, repeatRows=1)
        tbl_style_cmds = [
            ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#1E3A5F")),
            ("ROWBACKGROUNDS", (0, 1), (-1, len(rows)), [colors.white, colors.HexColor("#F8FAFC")]),
            ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#CBD5E1")),
            ("INNERGRID", (0, 0), (-1, -1), 0.3, colors.HexColor("#E2E8F0")),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("TOPPADDING", (0, 0), (-1, -1), 4),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ("LEFTPADDING", (0, 0), (-1, -1), 4),
            ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ]
        if total_row:
            tbl_style_cmds.append(("BACKGROUND", (0, -1), (-1, -1), colors.HexColor("#DBEAFE")))
        detail_tbl.setStyle(TableStyle(tbl_style_cmds))
        story.append(detail_tbl)

    # Notas metodológicas y limitaciones al final del PDF
    story.append(Spacer(1, 12))
    story.append(Paragraph("NOTAS METODOLÓGICAS Y LIMITACIONES", sec_style))
    meth = model.get("methodology", {})
    for line in (
        meth.get("definitions", [])
        + meth.get("formulas", [])
        + meth.get("rules", [])
        + meth.get("limitations", [])
    ):
        story.append(Paragraph(f"• {line}", note_style))

    doc.build(
        story,
        canvasmaker=lambda *args, **kwargs: _NumberedCanvas(*args, report_meta=model, **kwargs),
    )
    buf.seek(0)
    return buf.getvalue()
