import { useState } from 'react';
import { aiService } from '../services/aiService';
import { AISummary, AISearchResult } from '../types';

export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSummary = async (titulo: string, autor: string, sinopsis?: string): Promise<AISummary | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await aiService.generateSummary(titulo, autor, sinopsis);
      return res;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al conectar con el asistente de IA');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getTopicSuggestions = async (query: string): Promise<AISearchResult | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await aiService.getSuggestions(query);
      return res;
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al obtener sugerencias de IA');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { getSummary, getTopicSuggestions, loading, error };
};
