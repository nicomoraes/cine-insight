'use client';

import { useInfiniteSearchQuery } from '@/hooks/use-infinite-search-query';

import { generateRandonKey } from '@/lib/generators';

import BackToTopButton from '../common/BackToTopButton';
import { MediaGrid, MediaGridCard, MediaGridLoading } from './MediaGrid';

type SearchGridProps = { q: string };

export function SearchGrid({ q }: SearchGridProps) {
  const { data, error, hasNextPage, isFetchingNextPage, isFetching, ref, isPending } =
    useInfiniteSearchQuery({ q });

  if (error)
    return (
      <div className='mx-auto my-10 flex flex-col items-center'>
        <h2 className='flex items-center gap-2 text-3xl font-bold'>Ooops!</h2>
        <p className='text-xl'>Opa, algo de errado aconteceu.</p>
      </div>
    );

  if (isPending) {
    return <MediaGridLoading />;
  }

  return (
    <>
      <BackToTopButton />
      <h2 className='inline-flex w-full flex-wrap items-center gap-2 whitespace-nowrap text-lg'>
        {data?.totalResults} resultados para
        <span className='font-bold'>&ldquo;{q}&rdquo;</span>
      </h2>
      {data?.results.length === 0 && (
        <div className='mx-auto my-10 flex flex-col items-center gap-2 text-center'>
          <h2 className='flex items-center gap-2 text-3xl font-bold'>Sem resultados!</h2>
          <p className='text-xl text-foreground/80'>
            Nenhum resultado foi encontrado a partir da sua pesquisa.
          </p>
        </div>
      )}
      {data && (
        <MediaGrid>
          {data?.results.map((media) => (
            <MediaGridCard
              key={generateRandonKey({})}
              mediaId={media.id}
              mediaPoster={media.poster_path}
              mediaTitle={media.title}
              mediaType={media.media_type}
            />
          ))}
        </MediaGrid>
      )}
      {!isFetching && hasNextPage && <div ref={ref} className='h-[10px]' />}
      {isFetchingNextPage && <MediaGridLoading size={6} />}
    </>
  );
}
