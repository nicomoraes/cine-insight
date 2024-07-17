'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useSearchBar } from '@/hooks/use-search-bar';
import { ArrowLeft, House, MagnifyingGlass } from '@phosphor-icons/react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';

export default function TopNav() {
  const router = useRouter();

  const { scrollY } = useScroll();
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('');

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > prevScrollY) {
      setScrollDirection('down');
    } else if (latest < prevScrollY * 3) {
      setScrollDirection('up');
    }
    setPrevScrollY(latest);
  });

  return (
    <motion.header
      variants={{
        up: {
          y: 0,
          transition: { duration: 0.25 },
        },
        down: {
          y: -100,
          transition: { duration: 0.1 },
        },
      }}
      animate={scrollDirection}
      className='fixed top-0 z-10 w-full bg-white/10 px-4 py-2 backdrop-blur-md sm:px-10 md:px-20'
    >
      <nav className='inline-flex w-full items-center justify-between gap-x-10'>
        <button
          onClick={() => router.back()}
          className='inline-flex items-center gap-2 p-2 duration-150 hover:text-foreground/80'
        >
          <ArrowLeft size={24} />
          <span className='hidden xs:block'>Voltar</span>
        </button>
        <TopNavSearchBar />
        <button
          onClick={() => router.push('/')}
          className='inline-flex items-center gap-2 p-2 duration-150 hover:text-foreground/80'
        >
          <House size={24} />
          <span className='hidden xs:block'>Início</span>
        </button>
      </nav>
    </motion.header>
  );
}

export function TopNavSearchBar() {
  const { onSubmit, query, setQuery } = useSearchBar();
  return (
    <form
      onSubmit={onSubmit}
      className='inline-flex w-full max-w-sm items-center gap-2 rounded-md border border-foreground/80 px-2 text-foreground/80 transition-[border] duration-150 focus-within:multi-[border-foreground;text-foreground] max-xs:hidden'
    >
      <MagnifyingGlass size={20} />
      <input
        onChange={(e) => setQuery(e.currentTarget.value)}
        className='w-full bg-inherit py-2 outline-none'
        placeholder='Pesquisar'
        type='search'
        value={query}
      />
    </form>
  );
}
