import { Metadata } from 'next';

import { SearchBar } from '@/components/home/SearchBar';
import { SearchGrid } from '@/components/home/SearchGrid';
import { TrendingGrid } from '@/components/home/TrendingGrid';
import { TrendingCardError } from '@/components/home/TrendingGridError';

export const metadata: Metadata = {
  title: 'Página inicial',
};

type HomeParams = {
  searchParams: Record<string, string>;
};

export default async function Home({ searchParams: { q } }: HomeParams) {
  return (
    <>
      <div className='bg-mesh' />
      <main className='flex min-h-svh w-full flex-col gap-4 px-4 py-10 sm:px-10'>
        <div className='col z-50 mx-auto flex w-full max-w-xl flex-col gap-2 xs:sticky xs:top-2'>
          <SearchBar />
        </div>
        <section className='mx-auto flex w-full max-w-6xl flex-col gap-2'>
          {q ? (
            <SearchGrid q={q} />
          ) : (
            <TrendingCardError>
              <TrendingGrid />
            </TrendingCardError>
          )}
        </section>
      </main>
    </>
  );
}
