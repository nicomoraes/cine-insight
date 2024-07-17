'use client';

import { ComponentProps } from 'react';

import { useSearchBar } from '@/hooks/use-search-bar';
import { MagnifyingGlass, XCircle } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';

type SearchBarProps = { formClassName?: ComponentProps<'form'>['className'] };

export function SearchBar({ formClassName }: SearchBarProps) {
  const { onSubmit, query, resetSearch, searchParams, setQuery } = useSearchBar();

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        'flex w-full max-w-lg items-center gap-y-2 rounded-md border bg-card px-4 py-2 text-card-foreground shadow-[0_0_30px_-10px_#000000] focus-within:multi-[outline-primary;outline;outline-[3px]]',
        formClassName,
      )}
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
              type='button'
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
