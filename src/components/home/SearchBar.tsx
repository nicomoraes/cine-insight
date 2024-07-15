'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { MagnifyingGlass, XCircle } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';

import { Button } from '../ui/button';

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

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (query.length === 0) return;
    router.push(pathname + '?' + createQueryString([['q', query]]));
  }

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
    <form
      onSubmit={onSubmit}
      className='mx-auto flex w-full max-w-lg items-center gap-y-2 rounded-md border bg-card px-4 py-2 text-card-foreground shadow-[0_0_30px_-10px_#000000] focus-within:multi-[outline-primary;outline;outline-[3px]]'
    >
      <input
        onChange={(e) => setQuery(e.currentTarget.value)}
        autoFocus
        className='w-full bg-inherit py-2 text-inherit outline-none sm:text-lg'
        placeholder='Pesquise pelo título de um filme ou série'
        type='search'
        value={query}
      />
      <div className='ml-2 flex w-max items-center gap-2'>
        <AnimatePresence>
          {searchParams.get('q') && (
            <motion.button
              onClick={resetSearch}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className='ml-2 text-sm text-destructive-foreground hover:bg-transparent hover:text-destructive-foreground/80 max-xs:sr-only xs:block'>
                Resetar
              </span>
              <XCircle size={24} className='fill-foreground xs:hidden' weight='fill' />
            </motion.button>
          )}
        </AnimatePresence>
        <Button
          aria-label='Pesquisar'
          size={'sm'}
          type='submit'
          className='hidden xs:block'
        >
          <MagnifyingGlass size={18} />
        </Button>
      </div>
    </form>
  );
}
