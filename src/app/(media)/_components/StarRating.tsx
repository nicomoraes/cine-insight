import { Star, StarHalf } from '@phosphor-icons/react/dist/ssr';

import { formatVoteAverageToStarRating } from '@/lib/formatters';
import { generateRandonKey } from '@/lib/generators';

type StarRatingProps = {
  voteAverage: number;
  options?: { size: number };
};

export default function StarRating({
  voteAverage,
  options = { size: 20 },
}: StarRatingProps) {
  const { fullStars, halfStars, emptyStars } = formatVoteAverageToStarRating(voteAverage);
  return (
    <div className='inline-flex items-center gap-1 text-yellow-400'>
      {Array(Number(fullStars))
        .fill(0)
        .map(() => (
          <Star key={generateRandonKey({})} weight='fill' size={options.size} />
        ))}
      {Array(Number(halfStars))
        .fill(0)
        .map(() => (
          <StarHalf weight='fill' key={generateRandonKey({})} size={options.size} />
        ))}
      {Array(Number(emptyStars))
        .fill(0)
        .map(() => (
          <Star key={generateRandonKey({})} size={options.size} />
        ))}
    </div>
  );
}
