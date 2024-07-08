import { SearchBar } from '@/components/home/SearchBar';
import { SearchGrid } from '@/components/home/SearchGrid';
import { TrendingGrid } from '@/components/home/TrendingGrid';
import { TrendingCardError } from '@/components/home/TrendingGridError';

type HomeParams = {
  searchParams: Record<string, string>;
};

export default async function Home({ searchParams: { q } }: HomeParams) {
  return (
    <main className='flex min-h-svh w-full flex-col gap-4 px-10 py-10'>
      <div className='col mx-auto flex w-full max-w-xl flex-col gap-2'>
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
  );
}
