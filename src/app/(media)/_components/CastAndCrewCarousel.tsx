import { generateRandonKey } from '@/lib/generators';

import Image from '@/components/common/Image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

type CastAndCrewCarouselProps = {
  title: string;
  persons: {
    imageUrl: string | null;
    name: string;
    role: string;
  }[];
};

export function CastAndCrewCarousel({ persons, title }: CastAndCrewCarouselProps) {
  return (
    <div className='flex w-full flex-col gap-2'>
      <h2 className='text-lg font-medium'>{title}</h2>
      <Carousel opts={{ align: 'start' }}>
        <CarouselContent>
          {persons.map((p) => (
            <CarouselItem
              key={generateRandonKey({})}
              className='basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-[10%]'
            >
              <div className='p-1'>
                <div className='flex flex-col'>
                  <Image
                    alt={p.name}
                    fallback='/img/1x1_image_fallback.png'
                    width={80}
                    height={80}
                    src={`${process.env.NEXT_PUBLIC_TMDB_API_BASE_IMAGE_URL}/w500/${p.imageUrl}`}
                    className='aspect-[2/3] w-full rounded-md object-cover'
                    unoptimized
                  />
                  <div className='flex flex-col pt-1'>
                    <span className='text-sm font-medium'>{p.name}</span>
                    <span className='line-clamp-3 text-wrap text-xs text-foreground/80'>
                      {p.role}
                    </span>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='h-full rounded-none border-none bg-gradient-to-r from-background/50 to-transparent text-lg transition-all duration-150 hover:multi-[from-background/80;cursor-pointer] disabled:multi-[text-muted;cursor-default] disabled:hover:from-background/50' />
        <CarouselNext className='h-full rounded-none border-none bg-gradient-to-l from-background/50 to-transparent text-lg transition-all duration-150 hover:multi-[from-background/80;cursor-pointer] disabled:multi-[text-muted-foreground;cursor-default] disabled:hover:from-background/50' />
      </Carousel>
    </div>
  );
}

export function CastAndCrewCarouselSkeleton() {
  return (
    <div className='flex w-full flex-col gap-2'>
      <Skeleton className='h-6 w-full max-w-[80px]' />
      <Carousel opts={{ align: 'start' }}>
        <CarouselContent>
          {Array(6)
            .fill(0)
            .map(() => (
              <CarouselItem
                key={generateRandonKey({})}
                className='basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6'
              >
                <div className='p-1'>
                  <div className='flex flex-col'>
                    <Skeleton className='ah-full aspect-[2/3] w-full flex-1 rounded-md' />
                    <div className='flex flex-col gap-2 pt-1'>
                      <Skeleton className='h-4 w-2/3' />
                      <Skeleton className='h-2 w-1/3' />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
