import { ReactNode } from 'react';

import Link from 'next/link';

import { FilmSlate, Television } from '@phosphor-icons/react/dist/ssr';

import { generateRandonKey } from '@/lib/generators';

import Image from '../common/Image';
import { Skeleton } from '../ui/skeleton';

type MediaGridProps = {
  children: ReactNode;
};

export function MediaGrid({ children }: MediaGridProps) {
  return (
    <div className='mt-4 grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
      {children}
    </div>
  );
}

type MediaGridCardProps = {
  mediaId: number;
  mediaTitle: string | undefined;
  mediaPoster: string | undefined;
  mediaType: 'movie' | 'tv';
};

export function MediaGridCard({
  mediaId,
  mediaPoster,
  mediaTitle,
  mediaType,
}: MediaGridCardProps) {
  return (
    <Link href={`/${mediaType === 'movie' ? 'filmes' : 'series'}/${mediaId}`}>
      <div className='relative col-span-1 aspect-[2/3] w-full overflow-hidden rounded-md outline outline-[4px] outline-offset-2 outline-transparent transition-all duration-150 hover:multi-[outline-primary;cursor-pointer;scale-105]'>
        <Image
          src={`${process.env.NEXT_PUBLIC_TMDB_API_BASE_IMAGE_URL}/w500/${mediaPoster}`}
          fallback='/img/2x3_image_fallback.png'
          alt={mediaTitle || 'Mídia'}
          className='aspect-[2/3] w-full object-cover'
          height={500}
          width={500}
        />
        <span className='absolute right-0 top-4 rounded-l-md rounded-r-none bg-secondary p-2 text-sm tracking-wide text-secondary-foreground shadow-lg'>
          {mediaType === 'movie' ? <FilmSlate size={24} /> : <Television size={24} />}
        </span>
      </div>
    </Link>
  );
}

type MediaGridLoading = {
  size?: number;
};

export function MediaGridLoading({ size = 20 }: MediaGridLoading) {
  return (
    <div className='mt-4 grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
      {Array(size)
        .fill(0)
        .map(() => (
          <Skeleton
            key={generateRandonKey({ prefix: 'search_loading' })}
            className='col-span-1 aspect-[2/3] w-full rounded-md'
          />
        ))}
    </div>
  );
}
