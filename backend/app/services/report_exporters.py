from __future__ import annotations

from datetime import date, datetime
from io import BytesIO
import math
import re
from typing import Any, Dict, List, Optional, Tuple

from openpyxl import Workbook
from openpyxl.chart import BarChart, DoughnutChart, LineChart, Reference
from openpyxl.chart.label import DataLabelList
from openpyxl.chart.marker import DataPoint
from openpyxl.chart.shapes import GraphicalProperties
from openpyxl.drawing.line import LineProperties
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
# EXPORTADOR EXCEL (.xlsx) — PLANTILLA COMPARTIDA (HOJAS RESUMEN Y DETALLE)
# ==============================================================================

_FONT_FAMILY = "Calibri"
_BLUE_DARK = "1E3A5F"
_BLUE_ACCENT = "2563EB"
_BLUE_MID = "3B82F6"
_BLUE_LIGHT = "EFF6FF"
_CARD_BG = "F8FAFC"
_ALT_ROW = "F8FAFC"
_BORDER_GRAY = "CBD5E1"
_GRID_LIGHT = "E2E8F0"
_TOTAL_BG = "DBEAFE"
_ALERT_BG = "FEF3C7"
_ALERT_TEXT = "B45309"
_TEXT_PRIMARY = "0F172A"
_TEXT_SECONDARY = "334155"
_TEXT_MUTED = "64748B"

_DOUGHNUT_PALETTE = ["2563EB", "0EA5E9", "1E3A5F", "60A5FA", "94A3B8", "0284C7", "38BDF8", "64748B"]
_ISO_DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
_SUMMARY_COLS = 13  # A:F (izq), G (separador), H:M (der)
_SUMMARY_COL_WIDTH = 14.5
_SUMMARY_GUTTER_COL = 7
_SUMMARY_GUTTER_WIDTH = 3.0


def _thin_border(color: str = _BORDER_GRAY) -> Border:
    side = Side(style="thin", color=color)
    return Border(left=side, right=side, top=side, bottom=side)


def _apply_box_border(ws, min_row: int, min_col: int, max_row: int, max_col: int, color: str = _BORDER_GRAY) -> None:
    side = Side(style="thin", color=color)
    for r in range(min_row, max_row + 1):
        for c in range(min_col, max_col + 1):
            cell = ws.cell(row=r, column=c)
            cell.border = Border(
                left=side if c == min_col else None,
                right=side if c == max_col else None,
                top=side if r == min_row else None,
                bottom=side if r == max_row else None,
            )


def _row_height_for_text(text: str, chars_per_line: int, min_height: float = 20.0, line_height: float = 15.0) -> float:
    if not text:
        return min_height
    lines = 0
    for paragraph in str(text).split("\n"):
        lines += max(1, math.ceil(len(paragraph) / max(chars_per_line, 1)))
    return max(min_height, lines * line_height + 6.0)


def _prepare_excel_cell_value(col_type: str, value: Any) -> Any:
    if value is None:
        return ""
    if col_type == "date" and isinstance(value, str):
        clean = value.strip()
        if _ISO_DATE_RE.match(clean):
            try:
                return datetime.strptime(clean, "%Y-%m-%d").date()
            except ValueError:
                return value
    return value


def _apply_number_format(cell, col_type: str, value: Any) -> None:
    if value is None:
        return
    if col_type == "date" and isinstance(value, (date, datetime)):
        cell.number_format = "yyyy-mm-dd"
        return
    if isinstance(value, str):
        return
    if col_type == "currency":
        cell.number_format = "$#,##0.00"
    elif col_type == "percent":
        cell.number_format = "0.0%"
    elif col_type == "int":
        cell.number_format = "#,##0"
    elif col_type == "float":
        cell.number_format = "#,##0.00"


def _build_excel_styles() -> Dict[str, Any]:
    return {
        "title_font": Font(name=_FONT_FAMILY, size=13, bold=True, color="FFFFFF"),
        "subtitle_font": Font(name=_FONT_FAMILY, size=12, bold=True, color=_BLUE_DARK),
        "section_font": Font(name=_FONT_FAMILY, size=11, bold=True, color=_BLUE_DARK),
        "sub_section_font": Font(name=_FONT_FAMILY, size=10, bold=True, color=_BLUE_DARK),
        "header_font": Font(name=_FONT_FAMILY, size=10, bold=True, color="FFFFFF"),
        "bold_font": Font(name=_FONT_FAMILY, size=10, bold=True, color=_TEXT_PRIMARY),
        "regular_font": Font(name=_FONT_FAMILY, size=10, color=_TEXT_SECONDARY),
        "muted_font": Font(name=_FONT_FAMILY, size=9, bold=True, color=_TEXT_MUTED),
        "card_label_font": Font(name=_FONT_FAMILY, size=9, bold=True, color=_TEXT_MUTED),
        "card_value_font": Font(name=_FONT_FAMILY, size=14, bold=True, color=_TEXT_PRIMARY),
        "card_text_font": Font(name=_FONT_FAMILY, size=11, bold=True, color=_TEXT_PRIMARY),
        "card_alert_value_font": Font(name=_FONT_FAMILY, size=13, bold=True, color=_ALERT_TEXT),
        "header_fill": PatternFill(start_color=_BLUE_DARK, end_color=_BLUE_DARK, fill_type="solid"),
        "sub_header_fill": PatternFill(start_color=_BLUE_ACCENT, end_color=_BLUE_ACCENT, fill_type="solid"),
        "light_fill": PatternFill(start_color=_BLUE_LIGHT, end_color=_BLUE_LIGHT, fill_type="solid"),
        "card_fill": PatternFill(start_color=_CARD_BG, end_color=_CARD_BG, fill_type="solid"),
        "alt_fill": PatternFill(start_color=_ALT_ROW, end_color=_ALT_ROW, fill_type="solid"),
        "total_fill": PatternFill(start_color=_TOTAL_BG, end_color=_TOTAL_BG, fill_type="solid"),
        "alert_fill": PatternFill(start_color=_ALERT_BG, end_color=_ALERT_BG, fill_type="solid"),
        "border": _thin_border(),
    }


def _allocate_kpi_spans(kpis: List[Dict[str, Any]], total_cols: int = _SUMMARY_COLS) -> List[int]:
    if not kpis:
        return []
    n = len(kpis)
    if n <= 4:
        base = total_cols // n
        spans = [base] * n
        spans[-1] += total_cols - sum(spans)
        return spans

    # 5 o más KPIs en 13 columnas: dar 4 columnas a tarjetas con texto largo
    wide_indices = [
        i for i, k in enumerate(kpis)
        if k.get("format") == "text" and len(str(k.get("value") or "")) > 14
    ]
    if n == 5:
        if len(wide_indices) == 1:
            spans = [2, 2, 2, 2, 2]
            spans[wide_indices[0]] = 4
            # Sumar 1 columna extra al primer KPI no ancho para llegar a 13
            for i in range(5):
                if i != wide_indices[0]:
                    spans[i] += 1
                    break
            return spans
        return [3, 3, 3, 2, 2]
    if n == 6:
        return [2, 2, 2, 2, 2, 3]
    base = max(2, total_cols // n)
    return [base] * n


def _prepare_chart_series(chart_spec: Dict[str, Any], has_report_rows: bool) -> Dict[str, Any]:
    raw_cats = list(chart_spec.get("categories") or [])
    raw_vals = list(chart_spec.get("values") or [])
    pairs: List[Tuple[str, float]] = []
    for c_name, val in zip(raw_cats, raw_vals):
        num = float(val) if isinstance(val, (int, float)) else 0.0
        pairs.append((str(c_name), num))

    is_placeholder = (
        not pairs
        or (len(pairs) == 1 and pairs[0][0] in ("Sin datos", "Sin vencidos") and pairs[0][1] == 0)
        or (not has_report_rows and all(v == 0 for _, v in pairs))
    )
    if is_placeholder:
        return {"empty": True, "categories": [], "values": [], "grouped_others": False}

    chart_type = chart_spec.get("type", "bar")
    grouped_others = False
    if chart_type != "line":
        # Ordenar de mayor a menor para facilitar lectura en barras horizontales y anillos
        pairs.sort(key=lambda item: item[1], reverse=True)
        if len(pairs) > 8:
            top = pairs[:7]
            others_sum = sum(v for _, v in pairs[7:])
            top.append(("Otras", round(others_sum, 2) if chart_spec.get("value_format") == "currency" else int(others_sum)))
            pairs = top
            grouped_others = True

    return {
        "empty": False,
        "categories": [p[0] for p in pairs],
        "values": [p[1] for p in pairs],
        "grouped_others": grouped_others,
    }


def _style_gridlines_and_borders(xl_chart: Any, is_doughnut: bool = False) -> None:
    xl_chart.graphical_properties = GraphicalProperties()
    xl_chart.graphical_properties.line = LineProperties(solidFill=_GRID_LIGHT, w=12700)  # 1pt sutil
    if xl_chart.plot_area is not None:
        xl_chart.plot_area.graphical_properties = GraphicalProperties()
        xl_chart.plot_area.graphical_properties.noFill = True
        xl_chart.plot_area.graphical_properties.line = LineProperties(noFill=True)

    if is_doughnut:
        return

    # Cuadrícula horizontal muy clara y sin cuadrícula vertical
    grid_line = GraphicalProperties()
    grid_line.line = LineProperties(solidFill=_GRID_LIGHT, w=6350)  # 0.5pt

    is_horizontal_bar = getattr(xl_chart, "type", None) == "bar"

    if getattr(xl_chart, "y_axis", None) is not None:
        if is_horizontal_bar:
            xl_chart.y_axis.majorGridlines = None
        else:
            from openpyxl.chart.axis import ChartLines
            xl_chart.y_axis.majorGridlines = ChartLines(spPr=grid_line)

    if getattr(xl_chart, "x_axis", None) is not None:
        if is_horizontal_bar:
            from openpyxl.chart.axis import ChartLines
            xl_chart.x_axis.majorGridlines = ChartLines(spPr=grid_line)
        else:
            xl_chart.x_axis.majorGridlines = None


def _build_native_chart(
    ws: Any,
    chart_spec: Dict[str, Any],
    series_data: Dict[str, Any],
    hdr_row: int,
    data_start: int,
    data_end: int,
    val_col: int,
    cat_col: int,
) -> Any:
    chart_id = chart_spec.get("id", "")
    spec_type = chart_spec.get("type", "bar")
    v_fmt = chart_spec.get("value_format", "int")
    cats = series_data["categories"]
    vals = series_data["values"]

    use_doughnut = (
        spec_type == "bar"
        and chart_id in ("chart-modalidad", "chart-ced-mod")
        and len(cats) <= 5
        and sum(vals) > 0
    )

    data_ref = Reference(ws, min_col=val_col, min_row=hdr_row, max_row=data_end)
    cats_ref = Reference(ws, min_col=cat_col, min_row=data_start, max_row=data_end)

    title_text = chart_spec["title"]
    if series_data.get("grouped_others"):
        title_text = f"{title_text} (Top 7 + Otras)"

    if use_doughnut:
        xl_chart = DoughnutChart()
        xl_chart.title = title_text
        xl_chart.style = 2
        xl_chart.varyColors = True
        xl_chart.holeSize = 52
        xl_chart.add_data(data_ref, titles_from_data=True)
        xl_chart.set_categories(cats_ref)
        xl_chart.legend.position = "b"
        xl_chart.dataLabels = DataLabelList()
        xl_chart.dataLabels.showPercent = True
        xl_chart.dataLabels.showVal = True
        xl_chart.dataLabels.showCatName = False
        xl_chart.dataLabels.showSerName = False
        if xl_chart.series:
            for idx in range(len(cats)):
                pt = DataPoint(idx=idx)
                pt.graphicalProperties.solidFill = _DOUGHNUT_PALETTE[idx % len(_DOUGHNUT_PALETTE)]
                xl_chart.series[0].data_points.append(pt)
        _style_gridlines_and_borders(xl_chart, is_doughnut=True)
    elif spec_type == "line":
        xl_chart = LineChart()
        xl_chart.title = title_text
        xl_chart.style = 2
        xl_chart.legend = None
        xl_chart.add_data(data_ref, titles_from_data=True)
        xl_chart.set_categories(cats_ref)
        xl_chart.x_axis.delete = False
        xl_chart.y_axis.delete = False
        xl_chart.y_axis.scaling.min = 0
        xl_chart.y_axis.number_format = "#,##0" if v_fmt == "int" else "$#,##0"
        if v_fmt == "int":
            max_val = max((float(v) for v in vals), default=0.0)
            if max_val <= 0:
                xl_chart.y_axis.scaling.max = 5
                xl_chart.y_axis.majorUnit = 1
            elif max_val <= 10:
                xl_chart.y_axis.scaling.max = max(int(math.ceil(max_val)) + 1, 2)
                xl_chart.y_axis.majorUnit = 1
            else:
                xl_chart.y_axis.majorUnit = max(1, math.ceil(max_val / 5))
        xl_chart.dataLabels = DataLabelList()
        xl_chart.dataLabels.showVal = True
        xl_chart.dataLabels.showCatName = False
        xl_chart.dataLabels.showSerName = False
        if xl_chart.series:
            s0 = xl_chart.series[0]
            s0.graphicalProperties.line.solidFill = _BLUE_ACCENT
            s0.graphicalProperties.line.width = 28000
            s0.marker.symbol = "circle"
            s0.marker.size = 6
            s0.marker.graphicalProperties.solidFill = _BLUE_DARK
        _style_gridlines_and_borders(xl_chart, is_doughnut=False)
    else:
        xl_chart = BarChart()
        xl_chart.type = "bar"  # Barras horizontales para lectura limpia de etiquetas largas
        xl_chart.style = 2
        xl_chart.varyColors = False
        xl_chart.title = title_text
        xl_chart.legend = None
        xl_chart.gapWidth = 75
        xl_chart.add_data(data_ref, titles_from_data=True)
        xl_chart.set_categories(cats_ref)

        # En BarChart horizontal: x_axis = categorías (arriba el mayor), y_axis = valores
        xl_chart.x_axis.delete = False
        xl_chart.y_axis.delete = False
        xl_chart.x_axis.scaling.orientation = "maxMin"
        xl_chart.y_axis.scaling.min = 0
        xl_chart.y_axis.number_format = "$#,##0" if v_fmt == "currency" else "#,##0"
        if v_fmt == "int":
            max_val = max((float(v) for v in vals), default=0.0)
            if max_val <= 0:
                xl_chart.y_axis.scaling.max = 5
                xl_chart.y_axis.majorUnit = 1
            elif max_val <= 10:
                xl_chart.y_axis.scaling.max = max(int(math.ceil(max_val)) + 1, 2)
                xl_chart.y_axis.majorUnit = 1
            else:
                xl_chart.y_axis.majorUnit = max(1, math.ceil(max_val / 5))
        xl_chart.x_axis.tickLblPos = "low"

        xl_chart.dataLabels = DataLabelList()
        xl_chart.dataLabels.showVal = True
        xl_chart.dataLabels.showCatName = False
        xl_chart.dataLabels.showSerName = False

        if xl_chart.series:
            s0 = xl_chart.series[0]
            s0.graphicalProperties.solidFill = _BLUE_ACCENT
            s0.graphicalProperties.line.noFill = True
            if len(vals) > 1:
                max_val = max(vals)
                max_idx = vals.index(max_val)
                pt = DataPoint(idx=max_idx)
                pt.graphicalProperties.solidFill = _BLUE_DARK
                s0.data_points.append(pt)

        _style_gridlines_and_borders(xl_chart, is_doughnut=False)

    # Título fuera del área de trazado, arriba
    if xl_chart.title is not None:
        xl_chart.title.overlay = False
    xl_chart.width = 15.2
    xl_chart.height = 9.2
    return xl_chart


def _write_support_table(
    ws: Any,
    start_row: int,
    cat_start_col: int,
    cat_end_col: int,
    val_col: int,
    chart_spec: Dict[str, Any],
    series_data: Dict[str, Any],
    styles: Dict[str, Any],
) -> Tuple[int, int, int]:
    """Escribe la tabla de apoyo para una gráfica y devuelve (hdr_row, data_start, data_end)."""
    ws.merge_cells(start_row=start_row, start_column=cat_start_col, end_row=start_row, end_column=val_col)
    c_title = ws.cell(row=start_row, column=cat_start_col, value=chart_spec["title"])
    c_title.font = styles["sub_section_font"]
    c_title.alignment = Alignment(horizontal="left", vertical="center")
    ws.row_dimensions[start_row].height = 20

    hdr_row = start_row + 1
    ws.merge_cells(start_row=hdr_row, start_column=cat_start_col, end_row=hdr_row, end_column=cat_end_col)
    c_cat_hdr = ws.cell(row=hdr_row, column=cat_start_col, value="Categoría")
    c_cat_hdr.font = styles["header_font"]
    c_cat_hdr.fill = styles["sub_header_fill"]
    c_cat_hdr.alignment = Alignment(horizontal="left", vertical="center", indent=1)
    for col_i in range(cat_start_col, cat_end_col + 1):
        ws.cell(row=hdr_row, column=col_i).fill = styles["sub_header_fill"]
        ws.cell(row=hdr_row, column=col_i).border = styles["border"]

    c_val_hdr = ws.cell(row=hdr_row, column=val_col, value=chart_spec.get("series_name", "Valor"))
    c_val_hdr.font = styles["header_font"]
    c_val_hdr.fill = styles["sub_header_fill"]
    c_val_hdr.border = styles["border"]
    c_val_hdr.alignment = Alignment(horizontal="right", vertical="center")
    ws.row_dimensions[hdr_row].height = 21

    r_cur = hdr_row + 1
    data_start = r_cur

    if series_data["empty"]:
        ws.merge_cells(start_row=r_cur, start_column=cat_start_col, end_row=r_cur, end_column=val_col)
        c_empty = ws.cell(row=r_cur, column=cat_start_col, value="Sin datos para el periodo")
        c_empty.font = styles["regular_font"]
        c_empty.alignment = Alignment(horizontal="center", vertical="center")
        for col_i in range(cat_start_col, val_col + 1):
            ws.cell(row=r_cur, column=col_i).border = styles["border"]
        ws.row_dimensions[r_cur].height = 22
        return hdr_row, data_start, r_cur

    v_fmt = chart_spec.get("value_format", "int")
    for idx, (c_name, v_num) in enumerate(zip(series_data["categories"], series_data["values"])):
        ws.merge_cells(start_row=r_cur, start_column=cat_start_col, end_row=r_cur, end_column=cat_end_col)
        cc = ws.cell(row=r_cur, column=cat_start_col, value=c_name)
        cc.font = styles["regular_font"]
        cc.alignment = Alignment(horizontal="left", vertical="center", wrap_text=True, indent=1)

        cv = ws.cell(row=r_cur, column=val_col, value=int(v_num) if v_fmt == "int" else v_num)
        cv.font = styles["regular_font"]
        cv.alignment = Alignment(horizontal="right", vertical="center")
        _apply_number_format(cv, v_fmt, cv.value)

        is_alt = idx % 2 == 1
        for col_i in range(cat_start_col, val_col + 1):
            cell_i = ws.cell(row=r_cur, column=col_i)
            cell_i.border = styles["border"]
            if is_alt:
                cell_i.fill = styles["alt_fill"]

        needed_h = _row_height_for_text(c_name, chars_per_line=58, min_height=19.0)
        cur_h = ws.row_dimensions[r_cur].height or 0
        if needed_h > cur_h:
            ws.row_dimensions[r_cur].height = needed_h
        r_cur += 1

    return hdr_row, data_start, r_cur - 1


def export_report_to_xlsx(model: Dict[str, Any]) -> bytes:
    wb = Workbook()
    styles = _build_excel_styles()

    # ------------------------------------------------------------------
    # HOJA 1: RESUMEN (CUADRÍCULA UNIFORME DE 12 COLUMNAS A:L)
    # ------------------------------------------------------------------
    ws_res = wb.active
    ws_res.title = "Resumen"
    ws_res.views.sheetView[0].showGridLines = True

    for col_idx in range(1, _SUMMARY_COLS + 1):
        w = _SUMMARY_GUTTER_WIDTH if col_idx == _SUMMARY_GUTTER_COL else _SUMMARY_COL_WIDTH
        ws_res.column_dimensions[get_column_letter(col_idx)].width = w

    # a) Encabezado institucional
    ws_res.merge_cells("A1:M1")
    ws_res["A1"] = "UNIVERSIDAD POLITÉCNICA DE DURANGO — SISTEMA DE ACERVO BIBLIOTECARIO"
    ws_res["A1"].font = styles["title_font"]
    ws_res["A1"].fill = styles["header_fill"]
    ws_res["A1"].alignment = Alignment(horizontal="left", vertical="center", indent=1)
    ws_res.row_dimensions[1].height = 30

    ws_res.merge_cells("A2:M2")
    ws_res["A2"] = f"{model['title']} ({model['code']})"
    ws_res["A2"].font = styles["subtitle_font"]
    ws_res["A2"].fill = styles["light_fill"]
    ws_res["A2"].alignment = Alignment(horizontal="left", vertical="center", indent=1)
    ws_res.row_dimensions[2].height = 24

    # Metadatos en 2 columnas bien alineadas
    meta_rows = [
        ("Periodo consultado:", model["period_label"], "Fecha de generación:", model["generated_at"]),
        ("Fecha de corte:", model["cutoff_date"], "Categoría:", model["badge"]),
    ]
    for r_idx, (l1, v1, l2, v2) in enumerate(meta_rows, start=3):
        ws_res.merge_cells(start_row=r_idx, start_column=1, end_row=r_idx, end_column=2)
        c_l1 = ws_res.cell(row=r_idx, column=1, value=l1)
        c_l1.font = styles["bold_font"]
        c_l1.alignment = Alignment(horizontal="left", vertical="center", indent=1)

        ws_res.merge_cells(start_row=r_idx, start_column=3, end_row=r_idx, end_column=6)
        c_v1 = ws_res.cell(row=r_idx, column=3, value=v1)
        c_v1.font = styles["regular_font"]
        c_v1.alignment = Alignment(horizontal="left", vertical="center", wrap_text=True)

        ws_res.merge_cells(start_row=r_idx, start_column=8, end_row=r_idx, end_column=9)
        c_l2 = ws_res.cell(row=r_idx, column=8, value=l2)
        c_l2.font = styles["bold_font"]
        c_l2.alignment = Alignment(horizontal="left", vertical="center")

        ws_res.merge_cells(start_row=r_idx, start_column=10, end_row=r_idx, end_column=13)
        c_v2 = ws_res.cell(row=r_idx, column=10, value=v2)
        c_v2.font = styles["regular_font"]
        c_v2.alignment = Alignment(horizontal="left", vertical="center", wrap_text=True)
        ws_res.row_dimensions[r_idx].height = 20

    # b) Indicadores principales como tarjetas
    row_cursor = 6
    ws_res.merge_cells(start_row=row_cursor, start_column=1, end_row=row_cursor, end_column=_SUMMARY_COLS)
    ws_res.cell(row=row_cursor, column=1, value="INDICADORES PRINCIPALES").font = styles["section_font"]
    ws_res.row_dimensions[row_cursor].height = 22
    row_cursor += 1

    kpis = model.get("kpis", [])
    spans = _allocate_kpi_spans(kpis, _SUMMARY_COLS)
    label_row = row_cursor
    value_row = row_cursor + 1
    ws_res.row_dimensions[label_row].height = 20
    value_row_height = 28.0

    col_cursor = 1
    for kpi, span in zip(kpis, spans):
        end_col = col_cursor + span - 1
        is_highlight = bool(kpi.get("highlight"))
        fill = styles["alert_fill"] if is_highlight else styles["card_fill"]

        ws_res.merge_cells(start_row=label_row, start_column=col_cursor, end_row=label_row, end_column=end_col)
        c_lbl = ws_res.cell(row=label_row, column=col_cursor, value=kpi["label"])
        c_lbl.font = styles["card_label_font"]
        c_lbl.alignment = Alignment(horizontal="left", vertical="center", wrap_text=True, indent=1)

        ws_res.merge_cells(start_row=value_row, start_column=col_cursor, end_row=value_row, end_column=end_col)
        fmt = kpi.get("format", "text")
        raw_val = kpi.get("numeric_value") if kpi.get("numeric_value") is not None else kpi.get("value")
        c_val = ws_res.cell(row=value_row, column=col_cursor, value=raw_val)

        if fmt == "text":
            c_val.font = styles["card_alert_value_font"] if is_highlight else styles["card_text_font"]
            c_val.alignment = Alignment(horizontal="left", vertical="center", wrap_text=True, indent=1)
            value_row_height = max(
                value_row_height,
                _row_height_for_text(str(raw_val or ""), chars_per_line=max(16, int(span * 11)), min_height=28.0),
            )
        else:
            c_val.font = styles["card_alert_value_font"] if is_highlight else styles["card_value_font"]
            c_val.alignment = Alignment(horizontal="left", vertical="center", indent=1)
            _apply_number_format(c_val, fmt, raw_val)

        for r_c in (label_row, value_row):
            for c_c in range(col_cursor, end_col + 1):
                ws_res.cell(row=r_c, column=c_c).fill = fill
        _apply_box_border(ws_res, label_row, col_cursor, value_row, end_col, _BORDER_GRAY)

        col_cursor = end_col + 1

    ws_res.row_dimensions[value_row].height = value_row_height
    row_cursor = value_row + 2

    # c) Hallazgos y recomendaciones (máximo 3)
    ws_res.merge_cells(start_row=row_cursor, start_column=1, end_row=row_cursor, end_column=_SUMMARY_COLS)
    ws_res.cell(row=row_cursor, column=1, value="HALLAZGOS Y RECOMENDACIONES").font = styles["section_font"]
    ws_res.row_dimensions[row_cursor].height = 22
    row_cursor += 1

    recs = (model.get("recommendations") or [])[:3]
    if not recs:
        ws_res.merge_cells(start_row=row_cursor, start_column=1, end_row=row_cursor, end_column=_SUMMARY_COLS)
        c_empty_rec = ws_res.cell(row=row_cursor, column=1, value="• Sin hallazgos destacados para el periodo.")
        c_empty_rec.font = styles["regular_font"]
        ws_res.row_dimensions[row_cursor].height = 20
        row_cursor += 1
    else:
        for rec in recs:
            ws_res.merge_cells(start_row=row_cursor, start_column=1, end_row=row_cursor, end_column=_SUMMARY_COLS)
            text_rec = f"• {rec}"
            c_rec = ws_res.cell(row=row_cursor, column=1, value=text_rec)
            c_rec.font = styles["regular_font"]
            c_rec.alignment = Alignment(horizontal="left", vertical="center", wrap_text=True, indent=1)
            ws_res.row_dimensions[row_cursor].height = _row_height_for_text(text_rec, chars_per_line=135, min_height=22.0)
            row_cursor += 1

    row_cursor += 1

    # d) y e) Tablas de apoyo y Gráficas nativas en cuadrícula de 2 columnas (A:F y G:L)
    charts_list = model.get("charts") or []
    has_rows = bool(model.get("rows"))
    if charts_list:
        ws_res.merge_cells(start_row=row_cursor, start_column=1, end_row=row_cursor, end_column=_SUMMARY_COLS)
        ws_res.cell(row=row_cursor, column=1, value="ANÁLISIS GRÁFICO Y TABLAS DE APOYO").font = styles["section_font"]
        ws_res.row_dimensions[row_cursor].height = 22
        row_cursor += 1

    for pair_idx in range(0, len(charts_list), 2):
        left_spec = charts_list[pair_idx]
        right_spec = charts_list[pair_idx + 1] if pair_idx + 1 < len(charts_list) else None

        left_data = _prepare_chart_series(left_spec, has_rows)
        l_hdr, l_start, l_end = _write_support_table(ws_res, row_cursor, 1, 5, 6, left_spec, left_data, styles)

        if right_spec is not None:
            right_data = _prepare_chart_series(right_spec, has_rows)
            r_hdr, r_start, r_end = _write_support_table(ws_res, row_cursor, 8, 12, 13, right_spec, right_data, styles)
            chart_top_row = max(l_end, r_end) + 2
        else:
            right_data = None
            r_hdr = r_start = r_end = l_end
            chart_top_row = l_end + 2

        if not left_data["empty"]:
            xl_left = _build_native_chart(ws_res, left_spec, left_data, l_hdr, l_start, l_end, 6, 1)
            ws_res.add_chart(xl_left, f"A{chart_top_row}")
        else:
            ws_res.merge_cells(start_row=chart_top_row, start_column=1, end_row=chart_top_row + 3, end_column=6)
            c_no_l = ws_res.cell(row=chart_top_row, column=1, value=f"{left_spec['title']}: Sin datos para el periodo")
            c_no_l.font = styles["muted_font"]
            c_no_l.alignment = Alignment(horizontal="center", vertical="center")
            _apply_box_border(ws_res, chart_top_row, 1, chart_top_row + 3, 6, _BORDER_GRAY)

        if right_spec is not None and right_data is not None:
            if not right_data["empty"]:
                xl_right = _build_native_chart(ws_res, right_spec, right_data, r_hdr, r_start, r_end, 13, 8)
                ws_res.add_chart(xl_right, f"H{chart_top_row}")
            else:
                ws_res.merge_cells(start_row=chart_top_row, start_column=8, end_row=chart_top_row + 3, end_column=13)
                c_no_r = ws_res.cell(row=chart_top_row, column=8, value=f"{right_spec['title']}: Sin datos para el periodo")
                c_no_r.font = styles["muted_font"]
                c_no_r.alignment = Alignment(horizontal="center", vertical="center")
                _apply_box_border(ws_res, chart_top_row, 8, chart_top_row + 3, 13, _BORDER_GRAY)

        has_any_chart = (not left_data["empty"]) or (right_data is not None and not right_data["empty"])
        row_cursor = chart_top_row + (20 if has_any_chart else 5)

    # Notas del reporte (información esencial conservada tras eliminar hoja Criterios)
    ws_res.merge_cells(start_row=row_cursor, start_column=1, end_row=row_cursor, end_column=_SUMMARY_COLS)
    c_notes_hdr = ws_res.cell(row=row_cursor, column=1, value="NOTAS DEL REPORTE")
    c_notes_hdr.font = styles["section_font"]
    c_notes_hdr.fill = styles["light_fill"]
    for col_i in range(1, _SUMMARY_COLS + 1):
        ws_res.cell(row=row_cursor, column=col_i).fill = styles["light_fill"]
        ws_res.cell(row=row_cursor, column=col_i).border = styles["border"]
    ws_res.row_dimensions[row_cursor].height = 22
    row_cursor += 1

    notes_items = [
        f"Periodo consultado: {model['period_label']}",
        f"Fecha de corte: {model['cutoff_date']}",
        *(model.get("methodology", {}).get("definitions") or []),
    ]
    for note in notes_items:
        ws_res.merge_cells(start_row=row_cursor, start_column=1, end_row=row_cursor, end_column=_SUMMARY_COLS)
        txt = f"• {note}"
        c_note = ws_res.cell(row=row_cursor, column=1, value=txt)
        c_note.font = styles["regular_font"]
        c_note.alignment = Alignment(horizontal="left", vertical="center", wrap_text=True, indent=1)
        ws_res.row_dimensions[row_cursor].height = _row_height_for_text(txt, chars_per_line=135, min_height=19.0)
        row_cursor += 1

    # Configuración de impresión para Resumen
    ws_res.page_setup.orientation = ws_res.ORIENTATION_LANDSCAPE
    ws_res.sheet_properties.pageSetUpPr.fitToPage = True
    ws_res.page_setup.fitToWidth = 1
    ws_res.page_setup.fitToHeight = 0

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
        cell.font = styles["header_font"]
        cell.fill = styles["header_fill"]
        cell.border = styles["border"]
        cell.alignment = Alignment(horizontal=col_def.get("align", "left"), vertical="center", wrap_text=True)
    ws_det.row_dimensions[1].height = 26

    # Inmovilizar primera fila (y columna de identificación si hay muchas columnas)
    ws_det.freeze_panes = "B2" if len(columns) > 6 else "A2"
    last_col_letter = get_column_letter(max(len(columns), 1))

    if not rows:
        ws_det.merge_cells(start_row=2, start_column=1, end_row=2, end_column=max(len(columns), 1))
        empty_cell = ws_det.cell(row=2, column=1, value="Sin datos para el periodo")
        empty_cell.font = styles["regular_font"]
        empty_cell.alignment = Alignment(horizontal="center", vertical="center")
        ws_det.row_dimensions[2].height = 24
        ws_det.auto_filter.ref = f"A1:{last_col_letter}2"
    else:
        for r_offset, row_data in enumerate(rows, start=2):
            is_alt = r_offset % 2 == 1
            for col_idx, col_def in enumerate(columns, start=1):
                col_type = col_def.get("type", "text")
                raw_val = row_data.get(col_def["key"], "")
                val = _prepare_excel_cell_value(col_type, raw_val)
                cell = ws_det.cell(row=r_offset, column=col_idx, value=val)
                cell.font = styles["regular_font"]
                cell.border = styles["border"]
                default_align = "right" if col_type in ("int", "float", "currency", "percent") else "left"
                cell.alignment = Alignment(
                    horizontal=col_def.get("align", default_align),
                    vertical="center",
                    wrap_text=True,
                )
                if is_alt:
                    cell.fill = styles["alt_fill"]
                _apply_number_format(cell, col_type, val)

        last_data_row = len(rows) + 1
        ws_det.auto_filter.ref = f"A1:{last_col_letter}{last_data_row}"

        if total_row:
            tot_r = last_data_row + 1
            for col_idx, col_def in enumerate(columns, start=1):
                col_type = col_def.get("type", "text")
                raw_val = total_row.get(col_def["key"], "")
                val = _prepare_excel_cell_value(col_type, raw_val)
                cell = ws_det.cell(row=tot_r, column=col_idx, value=val)
                cell.font = styles["bold_font"]
                cell.fill = styles["total_fill"]
                cell.border = styles["border"]
                default_align = "right" if col_type in ("int", "float", "currency", "percent") else "left"
                cell.alignment = Alignment(horizontal=col_def.get("align", default_align), vertical="center")
                _apply_number_format(cell, col_type, val)
            ws_det.row_dimensions[tot_r].height = 22

    # Anchos adecuados de columna
    for col_idx, col_def in enumerate(columns, start=1):
        hint = int(col_def.get("width_hint", 18))
        max_len = max(len(col_def["header"]) + 4, hint)
        for row_data in rows[:200]:
            v_str = str(row_data.get(col_def["key"], "") or "")
            max_len = max(max_len, min(len(v_str) + 3, 45))
        ws_det.column_dimensions[get_column_letter(col_idx)].width = max_len

    # Configuración de impresión: horizontal, 1 página de ancho, repetir encabezado
    ws_det.page_setup.orientation = ws_det.ORIENTATION_LANDSCAPE
    ws_det.sheet_properties.pageSetUpPr.fitToPage = True
    ws_det.page_setup.fitToWidth = 1
    ws_det.page_setup.fitToHeight = 0
    ws_det.print_title_rows = "1:1"

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
