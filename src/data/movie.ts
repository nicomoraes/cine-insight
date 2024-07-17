import { MovieRoot } from '@/types/movie';
import { AppendedCreditsRoot, AppendedReleasesRoot } from '@/types/movie/append';

import { handlePossibleNotFoundError } from '@/lib/errors';
import { tmdbFetcher } from '@/lib/fetcher';
import { getBrazilFlatrateWatchProviders } from '@/lib/getters';

import { generateGetWatchProvidersByIdPromise } from './media';

type GenerateMovieDetailsFetchReturn = MovieRoot & {
  releases: AppendedReleasesRoot;
  credits: AppendedCreditsRoot;
};

export async function generateMovieDetailsPromise(id: number) {
  const url = new URL(`${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/movie/${id}`);
  url.searchParams.append('language', 'pt-BR');
  url.searchParams.append('append_to_response', 'releases,credits');

  const promise = tmdbFetcher<GenerateMovieDetailsFetchReturn>(url.toString());

  return promise;
}

export async function getOneMovieById(id: number) {
  const moviePromise = generateMovieDetailsPromise(id);
  const watchProvidersPromise = generateGetWatchProvidersByIdPromise(id, 'movie');

  try {
    const [movie, watchProviders] = await Promise.all([
      moviePromise,
      watchProvidersPromise,
    ]);

    const brazilWatchProviders = getBrazilFlatrateWatchProviders(watchProviders);

    return { movie, watchProviders: brazilWatchProviders };
  } catch (error) {
    return handlePossibleNotFoundError(error);
  }
}
