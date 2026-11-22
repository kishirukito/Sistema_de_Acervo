/**
 * Bulk Import API Service — Handles batch importing of books and users/students.
 */

export interface BulkImportItemError {
  row: number;
  identifier: string;
  error: string;
}

export interface BulkImportResponse {
  total: number;
  successful_count: number;
  failed_count: number;
  successful: Array<Record<string, any>>;
  failed: BulkImportItemError[];
}

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('acervo_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/**
 * Sends a list of parsed books to the backend for bulk insertion into Supabase.
 */
export async function importBooksBulk(items: Array<Record<string, any>>): Promise<BulkImportResponse> {
  const res = await fetch('/api/v1/data/libros/bulk', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ items }),
  });

  if (!res.ok) {
    let errorMsg = `Error del servidor (${res.status})`;
    try {
      const errData = await res.json();
      if (errData.detail) errorMsg = typeof errData.detail === 'string' ? errData.detail : JSON.stringify(errData.detail);
    } catch {
      // response wasn't JSON
    }
    throw new Error(errorMsg);
  }

  return await res.json();
}

/**
 * Sends a list of parsed users/students to the backend for bulk insertion into Supabase.
 */
export async function importUsersBulk(items: Array<Record<string, any>>): Promise<BulkImportResponse> {
  const res = await fetch('/api/v1/data/usuarios/bulk', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ items }),
  });

  if (!res.ok) {
    let errorMsg = `Error del servidor (${res.status})`;
    try {
      const errData = await res.json();
      if (errData.detail) errorMsg = typeof errData.detail === 'string' ? errData.detail : JSON.stringify(errData.detail);
    } catch {
      // response wasn't JSON
    }
    throw new Error(errorMsg);
  }

  return await res.json();
}
