import { TmdbErrorResponse } from '@/types/tmdb-errors';

import { TMDB_DEFAULT_FETCH_CONFIG } from '@/constants/fetch';

import { TmdbResponseError } from './errors';

export async function tmdbFetcher<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(url, { ...TMDB_DEFAULT_FETCH_CONFIG, ...options });

  if (!response.ok) {
    const error = (await response.json()) as TmdbErrorResponse;
    throw new TmdbResponseError('Erro', error);
  }

  const data: T = await response.json();

  return data;
}

export async function fetcher<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(url, options);

  const data: T = await response.json();

  return data;
}
