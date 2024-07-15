import { Genre } from '@/types/movie';
import { SearchRoot, SingleSearchResult } from '@/types/search';
import { WatchProviderRoot } from '@/types/watch-provider';

import { STREAMINGS } from '@/constants/watch-providers';

type GetNextPageOptions = Pick<SearchRoot<SingleSearchResult>, 'page' | 'total_pages'>;

export function getNextPage({ page, total_pages }: GetNextPageOptions) {
  const hasNextPage = page + 1 < total_pages;
  const nextPage = hasNextPage ? page + 1 : null;
  return nextPage;
}

export function getGenresList(genres: Genre[]) {
  return genres.map((g) => g.name);
}

export function getFullYearFromStringDate(dateAsString: string) {
  return new Date(dateAsString).getFullYear();
}

export function getStreamingFromWatchProviders(name: string) {
  if (name.includes('Channel')) {
    const amazon = STREAMINGS.find((s) => s.name === 'Amazon Prime Video');
    const channel = amazon?.channels?.find((c) => c.name === name);
    return channel ? channel : null;
  }
  const streaming = STREAMINGS.find((s) => s.name === name);
  return streaming ? streaming : null;
}

export function getBrazilFlatrateWatchProviders(watchProviders: WatchProviderRoot) {
  return watchProviders &&
    watchProviders.results['BR'] &&
    watchProviders.results['BR'].flatrate &&
    watchProviders.results['BR'].flatrate.length > 0
    ? watchProviders.results['BR'].flatrate
    : null;
}
