import { Suspense } from 'react';

import Image from 'next/image';

import { SearchBar } from '../home/SearchBar';

type NotFoundContentProps = {
  description: string;
};

export default function NotFoundContent({ description }: NotFoundContentProps) {
  return (
    <div className='mx-auto flex min-h-svh w-full max-w-5xl items-center justify-center gap-2 px-4 max-md:flex-col md:justify-between md:px-10'>
      <div className='flex flex-col gap-4 max-md:items-center max-md:text-center'>
        <span className='text-foreground/80'>Erro 404</span>
        <h2 className='text-3xl font-bold md:text-5xl'>Página não encontrada</h2>
        <p className='text-base text-foreground/80 xs:text-xl'>{description}</p>
        <Suspense>
          <SearchBar />
        </Suspense>
      </div>
      <Image
        width={500}
        height={500}
        src={'/img/404_error.png'}
        alt='Ilustração do Storyset'
        className='max-w-xs lg:max-w-sm'
      />
    </div>
  );
}
