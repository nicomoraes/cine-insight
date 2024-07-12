import { AppendedCredits, AppendedReleases } from '@/types/appended';
import { Genre } from '@/types/movie';
import { SearchRoot, SingleSearchResult } from '@/types/search';

import { STREAMINGS } from '@/constants/watch-providers';

type GetNextPageOptions = Pick<SearchRoot<SingleSearchResult>, 'page' | 'total_pages'>;

export function getNextPage({ page, total_pages }: GetNextPageOptions) {
  const hasNextPage = page + 1 < total_pages;
  const nextPage = hasNextPage ? page + 1 : null;
  return nextPage;
}

export function getHoursByMinutes(runtime: number) {
  const hours = Math.floor(runtime / 60);
  const remainingMinutes = runtime % 60;
  return `${hours}h ${String(remainingMinutes).padStart(2, '0')}min`;
}

type GetBrazilCertificationReturn =
  | 'L'
  | '10'
  | '12'
  | '14'
  | '16'
  | '18'
  | null
  | undefined;
export function getBrazilCertification(releases: AppendedReleases) {
  const certification = releases.countries.find((c) => c.iso_3166_1 === 'BR')
    ?.certification as GetBrazilCertificationReturn;
  if (!certification) return null;
  const validCertifications = ['L', '10', '12', '14', '16', '18'];
  for (const substring of validCertifications) {
    if (certification.includes(substring)) {
      return substring as GetBrazilCertificationReturn;
    }
  }
  return null;
}

export function getGenresList(genres: Genre[]) {
  return genres.map((g) => g.name);
}

export function getWritersFromAppendedCredits(credits: AppendedCredits) {
  const writers = credits.crew.filter(
    (worker) => worker.job === 'Writer' || worker.job === 'Screenplay',
  );
  return writers.map((writer) => writer.name);
}

export function getDirectorsFromAppendedCredits(credits: AppendedCredits) {
  const directors = credits.crew.filter((worker) => worker.job === 'Director');
  return directors.map((director) => director.name);
}

export function getPersonsFromAppendedCredits(credits: AppendedCredits) {
  const crew = credits.crew.map((cw) => ({
    name: cw.name,
    role: cw.job,
    imageUrl: cw.profile_path,
  }));

  const cast = credits.cast.map((ct) => ({
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
