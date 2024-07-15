import { Skeleton } from '@/components/ui/skeleton';

import { CastAndCrewCarouselSkeleton } from '../../_components/CastAndCrewCarousel';
import { MediaCarouselSkeleton } from '../../_components/CollectionCarousel';

export default function Loading() {
  return (
    <>
      <div className='flex flex-col gap-6 px-4 pt-20 sm:px-10 md:px-20'>
        <div className='inline-flex items-center gap-4'>
          <Skeleton className='h-6 w-24' />
          <Skeleton className='aspect-square w-[34px]' />
          <Skeleton className='aspect-square w-[34px]' />
          <Skeleton className='aspect-square w-[34px]' />
        </div>
        <Skeleton className='h-10 w-full max-w-lg' />
        <div className='flex items-center gap-x-4'>
          <Skeleton className='h-6 w-full max-w-[115px]' />
          <Skeleton className='h-6 w-full max-w-[43px]' />
          <Skeleton className='h-6 w-full max-w-[66px]' />
          <Skeleton className='aspect-square h-6 w-full max-w-[32px]' />
        </div>
        <Skeleton className='h-4 w-full max-w-[115px]' />
        <div className='flex flex-col gap-2'>
          <Skeleton className='h-4 w-full max-w-lg' />
          <Skeleton className='h-4 w-full max-w-md' />
          <Skeleton className='h-4 w-full max-w-xs' />
        </div>
      </div>
      <div className='space-y-4 px-4 pb-6 pt-10 sm:px-20'>
        <MediaCarouselSkeleton />
        <CastAndCrewCarouselSkeleton />
        <CastAndCrewCarouselSkeleton />
      </div>
    </>
  );
}
