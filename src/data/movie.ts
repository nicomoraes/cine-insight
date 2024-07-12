import { AppendedCredits, AppendedReleases } from '@/types/appended';
import { MovieRoot } from '@/types/movie';
import { WatchProviderRoot } from '@/types/watch-provider';

import { TMDB_DEFAULT_FETCH_CONFIG } from '@/constants/fetch';

import { fetcher } from '@/lib/fetcher';

type GetOneMovieByIdFetch = MovieRoot & {
  releases: AppendedReleases;
  credits: AppendedCredits;
};

export async function getOneMovieById(id: number) {
  const url = new URL(`${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/movie/${id}`);
  url.searchParams.append('language', 'pt-BR');
  url.searchParams.append('append_to_response', 'releases,credits');

  const watchProvidersUrl = new URL(
    `${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/movie/${id}/watch/providers`,
  );

  const moviePromise = fetcher<GetOneMovieByIdFetch>(
    url.toString(),
    TMDB_DEFAULT_FETCH_CONFIG,
  );

  const watchProvidersPromise = fetcher<WatchProviderRoot>(
    watchProvidersUrl.toString(),
    TMDB_DEFAULT_FETCH_CONFIG,
  );

  const [data, watchProviders] = await Promise.all([moviePromise, watchProvidersPromise]);

  const brazilWatchProviders =
    watchProviders.results['BR'] &&
    watchProviders.results['BR'].flatrate &&
    watchProviders.results['BR'].flatrate.length > 0
      ? watchProviders.results['BR'].flatrate
      : null;

  return { data, watchProviders: brazilWatchProviders };
}
