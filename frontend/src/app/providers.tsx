import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../features/auth/AuthContext';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // staleTime global: 5 minutos — regreso a pantalla no relanza petición
            // si los datos tienen menos de 5 min. Las queries de solicitudes y libros
            // declaran su propio staleTime más corto donde corresponde.
            staleTime: 1000 * 60 * 5,
            // gcTime: cuánto tiempo permanecen en memoria los datos sin consumidores.
            // 10 minutos permite navegar y volver sin re-fetching innecesario.
            gcTime: 1000 * 60 * 10,
            // 1 reintento ante error de red; falla rápido ante 4xx/5xx.
            retry: 1,
            // No re-fetching silencioso al ganar foco salvo que la query lo active.
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
