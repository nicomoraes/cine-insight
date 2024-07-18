'use client';

import { useEffect } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { MultiSearchResult } from '@/types/search';

import { getSearch } from '@/data/media';

type UseSearchBarProps = { q: string };

export function useInfiniteSearchQuery({ q }: UseSearchBarProps) {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isPending,
  } = useInfiniteQuery({
    queryKey: ['search', q],
    queryFn: ({ pageParam }) => getSearch({ pageParam, query: q }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    select: (data) => {
      const results = data?.pages.reduce<MultiSearchResult[]>((prev, curr) => {
        return [...prev, ...curr.results];
      }, []);
      return {
        results,
        totalResults: data.pages[0].total_results,
      };
    },
  });

  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [fetchNextPage, inView, hasNextPage]);

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending,
    ref,
  };
}
