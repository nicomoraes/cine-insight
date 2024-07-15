import { MovieRoot } from '@/types/movie';
import { AppendedCreditsRoot, AppendedReleasesRoot } from '@/types/movie/append';

import { TMDB_DEFAULT_FETCH_CONFIG } from '@/constants/fetch';

import { fetcher } from '@/lib/fetcher';
import { getBrazilFlatrateWatchProviders } from '@/lib/getters';

import { generateGetWatchProvidersByIdPromise } from './media';

type GenerateMovieDetailsFetchReturn = MovieRoot & {
  releases: AppendedReleasesRoot;
  credits: AppendedCreditsRoot;
};

async function generateMovieDetailsPromise(id: number) {
  const url = new URL(`${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/movie/${id}`);
  url.searchParams.append('language', 'pt-BR');
  url.searchParams.append('append_to_response', 'releases,credits');

  const promise = fetcher<GenerateMovieDetailsFetchReturn>(
    url.toString(),
    TMDB_DEFAULT_FETCH_CONFIG,
  );

  return promise;
}

export async function getOneMovieById(id: number) {
  const moviePromise = generateMovieDetailsPromise(id);
  const watchProvidersPromise = generateGetWatchProvidersByIdPromise(id, 'movie');

  const [movie, watchProviders] = await Promise.all([
    moviePromise,
    watchProvidersPromise,
  ]);

  const brazilWatchProviders = getBrazilFlatrateWatchProviders(watchProviders);

  return { movie, watchProviders: brazilWatchProviders };
}
