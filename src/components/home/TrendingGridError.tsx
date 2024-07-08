'use client';

import { ReactNode } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

type TrendingCardErrorProps = {
  children: ReactNode;
};

export function TrendingCardError({ children }: TrendingCardErrorProps) {
  return (
    <ErrorBoundary
      fallback={
        <div className='mx-auto my-10 flex flex-col items-center'>
          <h2 className='flex items-center gap-2 text-3xl font-bold'>Ooops!</h2>
          <p className='text-xl'>Opa, algo de errado aconteceu.</p>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
