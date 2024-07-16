import { CollectionRoot } from '@/types/collection';
import { MultiSearchResult, SearchRoot } from '@/types/search';
import { TrendingRoot } from '@/types/trending';
import { WatchProviderRoot } from '@/types/watch-provider';

import { fetcher, tmdbFetcher } from '@/lib/fetcher';

export async function getAllTrending(page: number = 1) {
  const url = new URL(`${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/trending/all/day`);
  url.searchParams.append('language', 'pt-BR');
  url.searchParams.append('page', String(page));

  const data = await tmdbFetcher<TrendingRoot>(url.toString(), {
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

  const data = await tmdbFetcher<CollectionRoot>(url.toString());

  return data.parts;
}

export function generateGetWatchProvidersByIdPromise(
  id: number,
  mediaType: 'movie' | 'tv',
) {
  const watchProvidersUrl = new URL(
    `${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/${mediaType}/${id}/watch/providers`,
  );

  const promise = tmdbFetcher<WatchProviderRoot>(watchProvidersUrl.toString());

  return promise;
}
