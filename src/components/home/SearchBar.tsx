'use client';

import { useCallback, useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { MagnifyingGlass } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '../ui/button';

const MotionButton = motion(Button);

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    setQuery(params.get('q') ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createQueryString = useCallback(
    (queries: [string, string][]) => {
      const params = new URLSearchParams(searchParams.toString());
      queries.forEach((q) => {
        const [key, value] = q;
        if (params.get(key)) return params.set(key, value);
        if (value) return params.append(key, value);
      });
      return params.toString();
    },
    [searchParams],
  );

  const clearQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('q');
    return params.toString();
  }, [searchParams]);

  function resetSearch() {
    router.push(pathname + '?' + clearQueryString());
    setQuery('');
  }

  return (
    <div className='mx-auto flex w-full max-w-lg items-center gap-y-2 rounded-md border bg-card px-4 py-2 text-card-foreground shadow-[0_0_30px_-10px_#000000] transition-[border] duration-150 focus-within:multi-[border-primary;border-2]'>
      <input
        onChange={(e) => setQuery(e.currentTarget.value)}
        placeholder='Pesquise por um filme ou série'
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        className='w-full bg-inherit py-2 text-inherit outline-none sm:text-lg'
        value={query}
      />
      <div className='flex items-center'>
        <AnimatePresence>
          {searchParams.get('q') && (
            <MotionButton
              className='text-destructive-foreground hover:bg-transparent hover:text-destructive-foreground/80'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetSearch}
              size={'sm'}
              transition={{ duration: 0.2 }}
              variant={'ghost'}
            >
              Resetar
            </MotionButton>
          )}
        </AnimatePresence>
        <Button
          aria-label='Pesquisar'
          size={'sm'}
          onClick={() => {
            router.push(pathname + '?' + createQueryString([['q', query]]));
          }}
        >
          <MagnifyingGlass size={18} />
        </Button>
      </div>
    </div>
  );
}
