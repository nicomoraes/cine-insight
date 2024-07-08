import { TrendUp } from '@phosphor-icons/react/dist/ssr';

import { getAllTrending } from '@/data/media';

import { generateRandonKey } from '@/lib/generators';

import { withSuspense } from '../common/withSuspense';
import { MediaGrid, MediaGridCard, MediaGridLoading } from './MediaGrid';

export async function TrendingGrid() {
  const trendingMedia = await getAllTrending();

  return (
    <>
      <h2 className='inline-flex items-center gap-1 text-2xl font-medium'>
        <TrendUp size={24} />
        Em alta
      </h2>
      <MediaGrid>
        {trendingMedia.results.map((media) => (
          <MediaGridCard
            key={generateRandonKey({})}
            mediaPoster={media.poster_path}
            mediaTitle={media.title}
            mediaType={media.media_type}
          />
        ))}
      </MediaGrid>
    </>
  );
}

export default withSuspense(TrendingGrid, <TrendingGridLoading />);

export function TrendingGridLoading() {
  return (
    <>
      <h2 className='inline-flex items-center gap-1 text-2xl font-medium'>
        <TrendUp size={24} />
        Em alta
      </h2>
      <MediaGridLoading />
    </>
  );
}
