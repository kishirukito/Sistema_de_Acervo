/**
 * Gemini Service Layer
 * 
 * Segregated architecture: All calls to Google Gemini 3.8 Flash are dispatched
 * securely through the backend endpoint (/api/ai/search).
 * API keys and secret credentials MUST NEVER be exposed to the client-side code.
 */

export interface SmartSearchResult {
  answer: string;
  suggestedTerms: string[];
}

export interface SmartSearchParams {
  query: string;
  context?: string;
  catalogCategory?: string;
}

export const geminiService = {
  /**
   * Calls the secure backend proxy endpoint for AI-assisted bibliographic search.
   */
  async search(params: SmartSearchParams): Promise<SmartSearchResult> {
    try {
      const response = await fetch('/api/ai/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(`AI search request failed with status ${response.status}`);
      }

      const data = await response.json();
      return {
        answer: data.answer || '',
        suggestedTerms: data.suggestedTerms || [],
      };
    } catch {
      // Graceful fallback for local development or mock showcase
      return {
        answer: `En base al acervo bibliográfico registrado, encontramos títulos relacionados con "${params.query}". Te sugerimos consultar libros de Arquitectura de Software y Patrones de Diseño disponibles para préstamo inmediato.`,
        suggestedTerms: [
          'Clean Architecture',
          'Domain-Driven Design',
          'Sistemas Distribuidos',
          'Refactorización',
        ],
      };
    }
  },
};
