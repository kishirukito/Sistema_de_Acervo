const AI_MICROSERVICE_URL = process.env.AI_MICROSERVICE_URL || 'http://localhost:8000/api/v1';

export interface AISummaryResult {
  resumen: string;
  palabras_clave: string;
  modelo: string;
  proveedor: string;
}

export interface AITopicsResult {
  query: string;
  topicos_relacionados: string[];
  total: number;
}

/**
 * Cliente HTTP para comunicarse con el Microservicio de Inteligencia Artificial (FastAPI / Ollama).
 */
export const aiClient = {
  /**
   * Solicita al microservicio de Python la generación de un resumen analítico y palabras clave.
   */
  async generarResumen(titulo: string, autor: string, sinopsis = ''): Promise<AISummaryResult> {
    try {
      const response = await fetch(`${AI_MICROSERVICE_URL}/ai/resumen`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo,
          autor,
          sinopsis_o_tema: sinopsis,
        }),
      });

      if (!response.ok) {
        throw new Error(`Microservicio de IA retornó status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('[AI CLIENT WARNING] No se pudo conectar con el microservicio de IA en Python. Usando fallback heurístico.');
      return {
        resumen: `Obra de consulta académica '${titulo}' de ${autor}. Registrado en el catálogo del Sistema de Acervo CIU.`,
        palabras_clave: `${titulo}, ${autor}, Acervo CIU, Biblioteca`,
        modelo: 'fallback-offline',
        proveedor: 'local_heuristic',
      };
    }
  },

  /**
   * Solicita al microservicio de Python sugerencias de tópicos y conceptos para búsqueda inteligente.
   */
  async sugerirTopicos(query: string): Promise<AITopicsResult> {
    try {
      const response = await fetch(`${AI_MICROSERVICE_URL}/ai/sugerencias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`Microservicio de IA retornó status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('[AI CLIENT WARNING] Microservicio de IA offline. Generando tópicos básicos.');
      return {
        query,
        topicos_relacionados: [query, `Fundamentos de ${query}`, `Aplicaciones de ${query}`],
        total: 3,
      };
    }
  },

  /**
   * Solicita la generación de embeddings vectoriales.
   */
  async generarEmbedding(texto: string): Promise<number[]> {
    try {
      const response = await fetch(`${AI_MICROSERVICE_URL}/ai/embeddings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto }),
      });

      if (!response.ok) return [];
      const data = await response.json();
      return data.embedding || [];
    } catch {
      return [];
    }
  },
};
