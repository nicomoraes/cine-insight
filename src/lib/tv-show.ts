import { BrazilCertification } from '@/types/certification';
import { AggregateCreditsRoot } from '@/types/tv-show/aggregate-credits';
import { AppendedContentRatingsRoot } from '@/types/tv-show/append';

import { VALID_CERTIFICATIONS } from '@/constants/media';

export function formatTvShowCredits(credits: AggregateCreditsRoot) {
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

export function getBrazilianTvShowCertification(
  contentRatings: AppendedContentRatingsRoot,
) {
  const certification = contentRatings.results
    ? contentRatings.results.find((r) => r.iso_3166_1 === 'BR')?.rating
    : null;
  if (!certification) return null;
  for (const substring of VALID_CERTIFICATIONS) {
    if (certification.includes(substring)) return substring as BrazilCertification;
  }
  return null;
}
