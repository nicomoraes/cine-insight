'use client';

import { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { ArrowClockwise, House } from '@phosphor-icons/react';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='mx-auto flex min-h-svh w-full max-w-5xl items-center justify-center gap-2 px-4 max-md:flex-col md:px-10'>
      <div className='flex flex-col gap-4 max-md:items-center max-md:text-center'>
        <h2 className='text-3xl font-bold md:text-5xl'>Oops! Algo deu errado.</h2>
        <p className='text-base text-foreground/80 sm:text-xl'>
          Ocorreu um erro inesperado. Tente recarregar a página ou volte para o início.
        </p>
        <div className='flex gap-4'>
          <Link href='/'>
            <Button className='w-max'>
              <House size={24} className='mr-2' /> Início
            </Button>
          </Link>
          <Button className='w-max' onClick={reset} variant={'secondary'}>
            <ArrowClockwise size={24} className='mr-2' /> Recarregar
          </Button>
        </div>
      </div>
      <Image
        alt='Ilustração do Storyset'
        className='max-w-xs max-sm:order-1 lg:max-w-sm'
        height={500}
        src={'/img/500_error.png'}
        width={500}
      />
    </div>
  );
}
