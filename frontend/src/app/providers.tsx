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
            // staleTime global: 5 minutos para datos que no son solicitudes.
            // Las queries de solicitudes usan su propio staleTime (10s) declarado
            // en su useQuery para ser más reactivas.
            staleTime: 1000 * 60 * 5,
            retry: 1,
            // Habilitar refetch al recuperar foco para toda la app.
            // Las queries de solicitudes lo sobrescriben con refetchOnWindowFocus: true.
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
