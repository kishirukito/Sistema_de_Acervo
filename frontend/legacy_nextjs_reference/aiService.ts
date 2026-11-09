import { api } from './api';
import { AISummary, AISearchResult } from '../types';

export const aiService = {
  async generateSummary(titulo: string, autor: string, sinopsis_o_tema: string = ''): Promise<AISummary> {
    const { data } = await api.post<AISummary>('/ai/resumen', {
      titulo,
      autor,
      sinopsis_o_tema,
    });
    return data;
  },

  async getSuggestions(query: string): Promise<AISearchResult> {
    const { data } = await api.post<AISearchResult>('/ai/sugerencias', { query });
    return data;
  }
};
