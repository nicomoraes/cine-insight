'use client';

import { ReactNode } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type CollectionCarouselErrorProps = {
  children: ReactNode;
};

export function CollectionCarouselError({ children }: CollectionCarouselErrorProps) {
  return (
    <ErrorBoundary
      fallback={
        <Alert
          variant={'destructive'}
          className='w-full bg-destructive text-destructive-foreground sm:w-max'
        >
          <AlertTitle>Ops! Algo deu errado.</AlertTitle>
          <AlertDescription>
            Não foi possível carregar os filmes da coleção.
          </AlertDescription>
        </Alert>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
