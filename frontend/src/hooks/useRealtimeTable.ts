/**
 * useRealtimeTable
 * Hook genérico para suscribirse a cambios en tiempo real de una tabla de Supabase.
 * Llama a `onInsert`, `onUpdate` o `onDelete` según el evento recibido.
 *
 * Uso:
 *   useRealtimeTable('solicitudes_prestamo', {
 *     onInsert: (row) => ...,
 *     onUpdate: (row) => ...,
 *     onDelete: (row) => ...,
 *     filter: 'usuario_id=eq.abc-123',  // opcional
 *   });
 */
import { useEffect, useRef } from 'react';
import { supabase } from '../services/api/supabase';

type RealtimeEvent = 'INSERT' | 'UPDATE' | 'DELETE';

interface UseRealtimeTableOptions<T = Record<string, any>> {
  onInsert?: (row: T) => void;
  onUpdate?: (row: T) => void;
  onDelete?: (row: T) => void;
  /** Filtro PostgREST opcional: 'column=eq.value' */
  filter?: string;
  /** Si es false, no suscribe (útil para condicionar por rol) */
  enabled?: boolean;
}

export function useRealtimeTable<T = Record<string, any>>(
  table: string,
  options: UseRealtimeTableOptions<T> = {}
) {
  const { onInsert, onUpdate, onDelete, filter, enabled = true } = options;

  // Mantén las callbacks estables sin re-suscribir por re-renders
  const onInsertRef = useRef(onInsert);
  const onUpdateRef = useRef(onUpdate);
  const onDeleteRef = useRef(onDelete);
  useEffect(() => { onInsertRef.current = onInsert; }, [onInsert]);
  useEffect(() => { onUpdateRef.current = onUpdate; }, [onUpdate]);
  useEffect(() => { onDeleteRef.current = onDelete; }, [onDelete]);

  useEffect(() => {
    if (!enabled) return;

    const channelName = `rt-${table}-${filter ?? 'all'}-${Date.now()}`;

    let channel = supabase.channel(channelName);

    const eventConfig: any = {
      event: '*',
      schema: 'public',
      table,
    };
    if (filter) eventConfig.filter = filter;

    channel = channel.on('postgres_changes', eventConfig, (payload: any) => {
      const event: RealtimeEvent = payload.eventType;
      const row = (payload.new ?? payload.old) as T;

      if (event === 'INSERT' && onInsertRef.current) onInsertRef.current(row);
      if (event === 'UPDATE' && onUpdateRef.current) onUpdateRef.current(row);
      if (event === 'DELETE' && onDeleteRef.current) onDeleteRef.current(row);
    });

    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.debug(`[Realtime] Suscrito a tabla "${table}"${filter ? ` (filtro: ${filter})` : ''}`);
      }
    });

    return () => {
      supabase.removeChannel(channel);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, filter, enabled]);
}

