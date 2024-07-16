'use client';

import { useEffect, useMemo } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { MultiSearchResult } from '@/types/search';

import { getSearch } from '@/data/media';

import { generateRandonKey } from '@/lib/generators';

import { MediaGrid, MediaGridCard, MediaGridLoading } from './MediaGrid';

type SearchGridProps = { q: string };

export function SearchGrid({ q }: SearchGridProps) {
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useInfiniteQuery({
      queryKey: ['search', q],
      queryFn: ({ pageParam }) => getSearch({ pageParam, query: q }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [fetchNextPage, inView, hasNextPage]);

  const results = useMemo(() => {
    if (error) return [];
    return data?.pages.reduce<MultiSearchResult[]>((prev, curr) => {
      return [...prev, ...curr.results];
    }, []);
  }, [data?.pages, error]);

  if (error)
    return (
      <div className='mx-auto my-10 flex flex-col items-center'>
        <h2 className='flex items-center gap-2 text-3xl font-bold'>Ooops!</h2>
        <p className='text-xl'>Opa, algo de errado aconteceu.</p>
      </div>
    );

  return (
    <>
      <h2 className='inline-flex w-full flex-wrap items-center gap-2 whitespace-nowrap text-lg'>
        {data?.pages[0].total_results} resultados para
        <span className='font-bold'>&ldquo;{q}&rdquo;</span>
      </h2>
      {isPending && <MediaGridLoading />}
      {results?.length === 0 && (
        <div className='mx-auto my-10 flex flex-col items-center gap-2 text-center'>
          <h2 className='flex items-center gap-2 text-3xl font-bold'>Sem resultados!</h2>
          <p className='text-xl text-foreground/80'>
            Nenhum resultado foi encontrado a partir da sua pesquisa.
          </p>
        </div>
      )}
      {results && (
        <MediaGrid>
          {results?.map((media) => (
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
      {!isPending && hasNextPage && <div ref={ref} className='h-[10px]' />}
      {!isPending && isFetchingNextPage && data?.pages?.length > 1 && (
        <MediaGridLoading size={6} />
      )}
    </>
  );
}
