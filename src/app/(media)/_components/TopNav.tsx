'use client';

import { useRouter } from 'next/navigation';

import { ArrowLeft } from '@phosphor-icons/react';

export default function TopNav() {
  const router = useRouter();
  return (
    <header className='absolute top-0 z-10 w-full px-4 py-4 sm:px-10 md:px-20'>
      <nav className='inline-flex w-full gap-4'>
        <button
          onClick={() => router.back()}
          className='inline-flex items-center gap-2 px-0'
        >
          <ArrowLeft size={24} />
          <span className='hidden xs:block'>Voltar</span>
        </button>
      </nav>
    </header>
  );
}
