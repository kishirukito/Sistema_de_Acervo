import pytest
from fastapi import HTTPException
from app.services.supabase_service import (
    validate_and_normalize_timestamptz,
    validate_and_normalize_date,
)

def test_timestamptz_normalization_valid_iso_date():
    result = validate_and_normalize_timestamptz("2026-11-18", "fecha_limite_devolucion")
    assert result == "2026-11-18T00:00:00Z"

def test_timestamptz_normalization_valid_iso_datetime():
    result = validate_and_normalize_timestamptz("2026-11-18T15:45:00Z", "fecha_limite_devolucion")
    assert result == "2026-11-18T15:45:00Z"

def test_timestamptz_normalization_valid_iso_datetime_no_tz():
    result = validate_and_normalize_timestamptz("2026-11-18T15:45:00", "fecha_limite_devolucion")
    assert result == "2026-11-18T15:45:00Z"

def test_timestamptz_rejection_spanish_localized_date():
    with pytest.raises(HTTPException) as exc_info:
        validate_and_normalize_timestamptz("18 nov. 2026", "fecha_limite_devolucion")
    assert exc_info.value.status_code == 400
    assert "Formato de fecha inválido" in exc_info.value.detail
    assert "fecha_limite_devolucion" in exc_info.value.detail

def test_timestamptz_rejection_slash_format():
    with pytest.raises(HTTPException) as exc_info:
        validate_and_normalize_timestamptz("18/11/2026", "fecha_limite_devolucion")
    assert exc_info.value.status_code == 400
    assert "Formato de fecha inválido" in exc_info.value.detail

def test_timestamptz_rejection_english_text():
    with pytest.raises(HTTPException) as exc_info:
        validate_and_normalize_timestamptz("Nov 18, 2026", "fecha_limite_devolucion")
    assert exc_info.value.status_code == 400
    assert "Formato de fecha inválido" in exc_info.value.detail

def test_date_normalization_valid_iso_date():
    result = validate_and_normalize_date("2026-11-18", "vigencia_hasta")
    assert result == "2026-11-18"

def test_date_normalization_from_datetime():
    result = validate_and_normalize_date("2026-11-18T15:45:00Z", "vigencia_hasta")
    assert result == "2026-11-18"

def test_date_rejection_invalid_format():
    with pytest.raises(HTTPException) as exc_info:
        validate_and_normalize_date("18 nov. 2026", "vigencia_hasta")
    assert exc_info.value.status_code == 400
    assert "Formato de fecha inválido" in exc_info.value.detail
