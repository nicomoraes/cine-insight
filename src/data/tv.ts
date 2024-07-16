import { TVShowRoot } from '@/types/tv-show';
import { AggregateCreditsRoot } from '@/types/tv-show/aggregate-credits';
import { AppendedContentRatingsRoot } from '@/types/tv-show/append';
import { TVSeasonRoot } from '@/types/tv-show/season';

import { handlePossibleNotFoundError } from '@/lib/errors';
import { fetcher, tmdbFetcher } from '@/lib/fetcher';
import { getBrazilFlatrateWatchProviders } from '@/lib/getters';

import { generateGetWatchProvidersByIdPromise } from './media';

type GenerateTvShowDetailsFetchReturn = TVShowRoot & {
  content_ratings: AppendedContentRatingsRoot;
};

function generateTvShowDetailsPromise(id: number) {
  const url = new URL(`${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/tv/${id}`);
  url.searchParams.append('language', 'pt-BR');
  url.searchParams.append('append_to_response', 'content_ratings,credits');

  const promise = tmdbFetcher<GenerateTvShowDetailsFetchReturn>(url.toString());

  return promise;
}

function generateTvShowAgreggateCredtisPromise(id: number) {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/tv/${id}/aggregate_credits`,
  );

  const promise = tmdbFetcher<AggregateCreditsRoot>(url.toString());

  return promise;
}

export async function getTvShowById(id: number) {
  const tvShowPromise = generateTvShowDetailsPromise(id);
  const watchProvidersPromise = generateGetWatchProvidersByIdPromise(id, 'tv');
  const aggregateCreditsPromise = generateTvShowAgreggateCredtisPromise(id);

  try {
    const [tvShow, watchProviders, aggregateCredits] = await Promise.all([
      tvShowPromise,
      watchProvidersPromise,
      aggregateCreditsPromise,
    ]);

    const brazilWatchProviders = getBrazilFlatrateWatchProviders(watchProviders);

    return {
      aggregateCredits,
      tvShow,
      watchProviders: brazilWatchProviders,
    };
  } catch (error) {
    return handlePossibleNotFoundError(error);
  }
}

type GetTvShowSeasonFromRouteHandler = {
  tvShowId: number;
  seasonNumber: number;
};

export async function getTvShowSeasonFromRouteHandler({
  tvShowId,
  seasonNumber,
}: GetTvShowSeasonFromRouteHandler) {
  const data = await fetcher<TVSeasonRoot>(
    `/api/tv/${tvShowId}/seasons/${seasonNumber}`,
    { method: 'GET' },
  );
  return data;
}
