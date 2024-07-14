import { Genre } from '@/types/movie';
import {
  AppendedReleases,
  AppendedCredits as MovieAppendedCredits,
} from '@/types/movie-append';
import { SearchRoot, SingleSearchResult } from '@/types/search';
import { AggregateCredits } from '@/types/tv-aggregate-credits';
import { AppendedContentRatings } from '@/types/tv-append';
import { WatchProviderRoot } from '@/types/watch-provider';

import { STREAMINGS } from '@/constants/watch-providers';

type GetNextPageOptions = Pick<SearchRoot<SingleSearchResult>, 'page' | 'total_pages'>;

export function getNextPage({ page, total_pages }: GetNextPageOptions) {
  const hasNextPage = page + 1 < total_pages;
  const nextPage = hasNextPage ? page + 1 : null;
  return nextPage;
}

export function getRuntimeString(runtime: number) {
  const hours = Math.floor(runtime / 60);
  const remainingMinutes = runtime % 60;
  return hours > 0
    ? `${hours}h ${String(remainingMinutes).padStart(2, '0')}min`
    : `${remainingMinutes}min`;
}

const VALID_CERTIFICATIONS = ['L', '10', '12', '14', '16', '18'];

type BrazilCertification = 'L' | '10' | '12' | '14' | '16' | '18' | null | undefined;

export function getMovieBrazilCertification(releases: AppendedReleases) {
  const certification = releases.countries.find((c) => c.iso_3166_1 === 'BR')
    ?.certification as BrazilCertification;
  if (!certification) return null;
  for (const substring of VALID_CERTIFICATIONS) {
    if (certification.includes(substring)) return substring as BrazilCertification;
  }
  return null;
}

export function getGenresList(genres: Genre[]) {
  return genres.map((g) => g.name);
}

export function getDirectorsFromAppendedCredits(credits: MovieAppendedCredits) {
  const directors = credits.crew.filter((worker) => worker.job === 'Director');
  return directors.map((director) => director.name);
}

export function getMoviePersonsFromAppendedCredits(credits: MovieAppendedCredits) {
  const crew = credits.crew
    .sort((a, b) => b.popularity - a.popularity)
    .map((cw) => ({
      name: cw.name,
      role: cw.job,
      imageUrl: cw.profile_path,
    }));

  const cast = credits.cast
    .sort((a, b) => b.popularity - a.popularity)
    .map((ct) => ({
      name: ct.name,
      role: ct.character,
      imageUrl: ct.profile_path,
    }));

  return { cast, crew };
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

export function getTvShowBrazilCertification(contentRatings: AppendedContentRatings) {
  const certification = contentRatings.results
    ? contentRatings.results.find((r) => r.iso_3166_1 === 'BR')?.rating
    : null;
  if (!certification) return null;
  for (const substring of VALID_CERTIFICATIONS) {
    if (certification.includes(substring)) return substring as BrazilCertification;
  }
  return null;
}

export function getMediaWatchProvidersFlatrate(watchProviders: WatchProviderRoot) {
  return watchProviders &&
    watchProviders.results['BR'] &&
    watchProviders.results['BR'].flatrate &&
    watchProviders.results['BR'].flatrate.length > 0
    ? watchProviders.results['BR'].flatrate
    : null;
}

export function getTvShowPersonsFromAggregateCredits(credits: AggregateCredits) {
  const crew = credits.crew.map((cw) => ({
    name: cw.name,
    role: cw.jobs.map((j) => j.job).join(', '),
    imageUrl: cw.profile_path || null,
  }));

  const cast = credits.cast.map((ct) => ({
    name: ct.name,
    role: ct.roles.map((r) => r.character.replace('voice', 'voz')).join(', '),
    imageUrl: ct.profile_path || null,
  }));

  return { cast, crew };
}
