import { getFullYear } from '@/lib/formatters';
import { getHoursByMinutes } from '@/lib/getters';

import StarRating from './StarRating';

type RatingProps = {
  voteAverage?: number;
};

export function Rating({ voteAverage }: RatingProps) {
  if (voteAverage === undefined || voteAverage === null)
    return <span className='text-lg'>Sem dados de avalição</span>;
  return <StarRating voteAverage={voteAverage} />;
}

type ReleaseYearProps = { releaseDate?: string };
export function ReleaseYear({ releaseDate }: ReleaseYearProps) {
  if (!releaseDate) return <span className='text-lg'>-</span>;
  return <span className='text-lg'>{getFullYear(releaseDate)}</span>;
}

type RuntimeProps = { runtime?: number };
export function Runtime({ runtime }: RuntimeProps) {
  if (!runtime) return <span className='text-lg'>-</span>;
  return <span className='text-lg'>{getHoursByMinutes(runtime)}</span>;
}
