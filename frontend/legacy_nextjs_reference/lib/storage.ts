import { supabaseAdmin } from './supabase';

const BUCKET_NAME = 'portadas';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

export interface FileUploadResult {
  url: string;
  path: string;
  nombre_original: string;
  tamano_bytes: number;
}

/**
 * Valida un archivo antes de procesar su subida.
 */
export function validarArchivoPortada(file: File): { valido: boolean; error?: string } {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valido: false,
      error: `Formato de archivo no permitido (${file.type}). Solo se permiten: JPG, PNG, WEBP o AVIF.`,
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valido: false,
      error: `El archivo excede el tamaño máximo permitido de 5 MB.`,
    };
  }

  return { valido: true };
}

/**
 * Sube una portada de libro al bucket de Supabase Storage y retorna la URL pública.
 */
export async function subirPortadaLibro(
  file: File | Blob,
  libroId: string,
  nombreOriginal = 'portada.jpg'
): Promise<FileUploadResult> {
  const extension = nombreOriginal.split('.').pop() || 'jpg';
  const filePath = `libros/${libroId}/${Date.now()}_portada.${extension}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET_NAME)
    .upload(filePath, buffer, {
      contentType: file.type || 'image/jpeg',
      upsert: true,
    });

  if (error) {
    throw new Error(`Error al subir imagen a Supabase Storage: ${error.message}`);
  }

  // Obtener URL pública
  const { data: publicUrlData } = supabaseAdmin.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path);

  return {
    url: publicUrlData.publicUrl,
    path: data.path,
    nombre_original: nombreOriginal,
    tamano_bytes: file.size,
  };
}

/**
 * Elimina una imagen de portada obsoleta del almacenamiento.
 */
export async function eliminarArchivoStorage(filePath: string): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin.storage.from(BUCKET_NAME).remove([filePath]);
    return !error;
  } catch {
    return false;
  }
}
