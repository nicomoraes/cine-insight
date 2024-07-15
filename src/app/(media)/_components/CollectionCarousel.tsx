import Link from 'next/link';

import { FilmSlate, Television } from '@phosphor-icons/react/dist/ssr';

import { CollectionTitle } from '@/types/collection';

import { generateRandonKey } from '@/lib/generators';

import Image from '@/components/common/Image';
import { withSuspense } from '@/components/common/withSuspense';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

type CollectionCardCarouselProps = {
  title: string;
  queryFn: () => Promise<CollectionTitle[]>;
};

async function CollectionCarousel({ queryFn, title }: CollectionCardCarouselProps) {
  const data = await queryFn();

  return (
    <div className='flex w-full flex-col gap-2'>
      <h2 className='text-lg font-medium'>{title}</h2>
      <Carousel opts={{ align: 'start' }}>
        <CarouselContent>
          {data.map((media) => (
            <CarouselItem
              key={generateRandonKey({})}
              className='basis-1/2 xs:basis-1/3 md:basis-1/4 lg:basis-1/5'
            >
              <div className='p-1'>
                <MediaCard
                  mediaId={media.id}
                  mediaImage={media.poster_path}
                  mediaTitle={media.title}
                  mediaType={media.media_type}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default withSuspense(CollectionCarousel, <MediaCarouselSkeleton />);

type MediaCardProps = {
  mediaId: number;
  mediaImage: string;
  mediaTitle: string;
  mediaType: string;
};

export async function MediaCard({
  mediaId,
  mediaImage,
  mediaTitle,
  mediaType,
}: MediaCardProps) {
  return (
    <Link href={`/${mediaType === 'movie' ? 'filmes' : 'series'}/${mediaId}`}>
      <Card>
        <CardContent className='relative flex aspect-[2/3] flex-col items-center justify-center overflow-hidden rounded-md outline outline-[4px] outline-offset-2 outline-transparent transition-all duration-150 hover:multi-[outline-primary;cursor-pointer]'>
          <Image
            alt={mediaTitle}
            className='w-full object-cover'
            fallback='/img/2x3_image_fallback.png'
            fill
            unoptimized
            src={`${process.env.NEXT_PUBLIC_TMDB_API_BASE_IMAGE_URL}/w500/${mediaImage}`}
          />
          <span className='absolute right-0 top-4 rounded-l-md rounded-r-none bg-secondary p-2 shadow-lg'>
            {mediaType === 'movie' ? <FilmSlate size={24} /> : <Television size={24} />}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}

export function MediaCarouselSkeleton() {
  return (
    <div className='flex w-full flex-col gap-2'>
      <Skeleton className='h-6 w-full max-w-[80px]' />
      <Carousel opts={{ align: 'start' }}>
        <CarouselContent>
          {Array(5)
            .fill(0)
            .map(() => (
              <CarouselItem
                key={generateRandonKey({})}
                className='basis-1/2 xs:basis-1/3 md:basis-1/4 lg:basis-1/5'
              >
                <div className='p-1'>
                  <Skeleton className='aspect-[3/4] h-full w-full flex-1' />
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
