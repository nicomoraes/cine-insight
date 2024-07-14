import { ComponentProps } from 'react';

import { getFullYear, getPtBrReleaseDate } from '@/lib/formatters';
import { getRuntimeString } from '@/lib/getters';

import StarRating from './StarRating';

type RatingProps = { voteAverage: number | null; voteCount: number };
export function Rating({ voteAverage, voteCount }: RatingProps) {
  if (voteAverage === undefined || voteAverage === null || voteCount === 0)
    return <span className='text-yellow-400/50'>Não avaliado</span>;
  return <StarRating voteAverage={voteAverage} />;
}

interface ReleaseYearProps extends ComponentProps<'span'> {
  releaseDate: string | null;
}
export function ReleaseYear({ releaseDate, ...props }: ReleaseYearProps) {
  return <span {...props}>{releaseDate ? getFullYear(releaseDate) : '-'}</span>;
}

interface ReleaseDateProps extends ComponentProps<'span'> {
  releaseDate: string | null;
}
export function ReleaseDate({ releaseDate, ...props }: ReleaseDateProps) {
  return <span {...props}>{releaseDate ? getPtBrReleaseDate(releaseDate) : '-'}</span>;
}

interface RuntimeProps extends ComponentProps<'span'> {
  runtime: number | null;
}
export function Runtime({ runtime, ...props }: RuntimeProps) {
  if (!runtime) return <span className='text-lg'>-</span>;
  return <span {...props}>{runtime ? getRuntimeString(runtime) : '-'}</span>;
}

interface NumberOfSeasonsProps extends ComponentProps<'span'> {
  numberOfSeasons: number | null;
}
export function NumberOfSeasons({ numberOfSeasons, ...props }: NumberOfSeasonsProps) {
  return (
    <span {...props}>
      {numberOfSeasons
        ? `${numberOfSeasons} ${numberOfSeasons > 1 ? 'temporadas' : 'temporada'}`
        : '-'}
    </span>
  );
}
