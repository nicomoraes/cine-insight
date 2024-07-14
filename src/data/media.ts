import { CollectionRoot } from '@/types/collection';
import { MultiSearchResult, SearchRoot } from '@/types/search';
import { TrendingRoot } from '@/types/trending';

import { TMDB_DEFAULT_FETCH_CONFIG } from '@/constants/fetch';

import { fetcher } from '@/lib/fetcher';

export async function getAllTrending(page: number = 1) {
  const url = new URL(`${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/trending/all/day`);
  url.searchParams.append('language', 'pt-BR');
  url.searchParams.append('page', String(page));

  const data = await fetcher<TrendingRoot>(url.toString(), {
    ...TMDB_DEFAULT_FETCH_CONFIG,
    next: {
      revalidate: 60 * 60,
    },
  });

  return data;
}

type GetSearchOptions = {
  pageParam: number;
  query: string;
};

export async function getSearch({ pageParam = 1, query }: GetSearchOptions) {
  const data = await fetcher<SearchRoot<MultiSearchResult> & { nextPage: number }>(
    `/api/search?page=${pageParam}&q=${query}`,
    { method: 'GET' },
  );
  return data;
}

export async function getCollectionById(id: number) {
  const url = new URL(`${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/collection/${id})`);
  url.searchParams.append('language', 'pt-BR');
  const data = await fetcher<CollectionRoot>(url.toString(), TMDB_DEFAULT_FETCH_CONFIG);
  return data.parts;
}
