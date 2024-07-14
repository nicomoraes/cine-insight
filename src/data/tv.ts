import { TVShowRoot } from '@/types/tv';
import { AggregateCredits } from '@/types/tv-aggregate-credits';
import { AppendedContentRatings } from '@/types/tv-append';
import { TVSeasonRoot } from '@/types/tv-season';
import { WatchProviderRoot } from '@/types/watch-provider';

import { TMDB_DEFAULT_FETCH_CONFIG } from '@/constants/fetch';

import { fetcher } from '@/lib/fetcher';
import {
  getMediaWatchProvidersFlatrate,
  getTvShowPersonsFromAggregateCredits,
} from '@/lib/getters';

type GetOneTvByIdFetch = TVShowRoot & {
  content_ratings: AppendedContentRatings;
};

export async function getTvShowById(id: number) {
  const url = new URL(`${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/tv/${id}`);
  url.searchParams.append('language', 'pt-BR');
  url.searchParams.append('append_to_response', 'content_ratings,credits');

  const watchProvidersUrl = new URL(
    `${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/tv/${id}/watch/providers`,
  );

  const aggregateCreditsUrl = new URL(
    `${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/tv/${id}/aggregate_credits`,
  );

  const tvPromise = fetcher<GetOneTvByIdFetch>(url.toString(), TMDB_DEFAULT_FETCH_CONFIG);

  const watchProvidersPromise = fetcher<WatchProviderRoot>(
    watchProvidersUrl.toString(),
    TMDB_DEFAULT_FETCH_CONFIG,
  );

  const aggregateCreditsPromise = fetcher<AggregateCredits>(
    aggregateCreditsUrl.toString(),
    TMDB_DEFAULT_FETCH_CONFIG,
  );

  const [data, watchProviders, aggregateCredits] = await Promise.all([
    tvPromise,
    watchProvidersPromise,
    aggregateCreditsPromise,
  ]);

  const brazilWatchProviders = getMediaWatchProvidersFlatrate(watchProviders);

  return {
    data,
    watchProviders: brazilWatchProviders,
    credits: getTvShowPersonsFromAggregateCredits(aggregateCredits),
  };
}

type GetTvShowSeason = {
  tvShowId: number;
  seasonNumber: number;
};

export async function getTvShowSeason({ seasonNumber = 1, tvShowId }: GetTvShowSeason) {
  const data = await fetcher<TVSeasonRoot>(
    `/api/tv/seasons/${seasonNumber}/?tvShowId=${tvShowId}`,
    { method: 'GET' },
  );
  return data;
}
