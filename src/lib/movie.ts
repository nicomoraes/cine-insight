import { BrazilCertification } from '@/types/certification';
import { AppendedCreditsRoot, AppendedReleasesRoot } from '@/types/movie/append';

import { VALID_CERTIFICATIONS } from '@/constants/media';

export function getBrazilianMovieCertification(releases: AppendedReleasesRoot) {
  const certification = releases.countries.find((c) => c.iso_3166_1 === 'BR')
    ?.certification as BrazilCertification;
  if (!certification) return null;
  for (const substring of VALID_CERTIFICATIONS) {
    if (certification.includes(substring)) return substring as BrazilCertification;
  }
  return null;
}

export function formatMovieCredits(credits: AppendedCreditsRoot) {
  const crew = credits.crew.map((cw) => ({
    name: cw.name,
    role: cw.job,
    imageUrl: cw.profile_path,
  }));

  const cast = credits.cast.map((ct) => ({
    name: ct.name,
    role: ct.character.replaceAll('voice', 'voz'),
    imageUrl: ct.profile_path,
  }));

  return { cast, crew };
}

export function extractDirectorsFromCredits(credits: AppendedCreditsRoot) {
  const directors = credits.crew.filter((worker) => worker.job === 'Director');
  return directors.map((director) => director.name);
}
