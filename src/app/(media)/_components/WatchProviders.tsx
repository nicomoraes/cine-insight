import { ArrowSquareOut } from '@phosphor-icons/react/dist/ssr';

import { Provider } from '@/types/watch-provider';

import { generateRandonKey } from '@/lib/generators';
import { getStreamingFromWatchProviders } from '@/lib/getters';

import Image from '@/components/common/Image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

type WatchProvidersProps = { providers: Provider[] | null };

export function WatchProviders({ providers }: WatchProvidersProps) {
  if (!providers || providers.length === 0) return null;
  return (
    <div className='inline-flex items-center gap-4'>
      <span className='grid max-xs:text-xs'>
        Disponível em <span className='text-sm text-muted-foreground'>by JustWatch</span>
      </span>
      {providers.map((p) => {
        const streaming = getStreamingFromWatchProviders(p.provider_name);
        return streaming ? (
          <HoverCard key={generateRandonKey({})}>
            <HoverCardTrigger>
              <Image
                alt={p.provider_name}
                fallback='/img/1x1_image_fallback.png'
                width={80}
                height={80}
                src={`${process.env.NEXT_PUBLIC_TMDB_API_BASE_IMAGE_URL}/w185/${p.logo_path}`}
                className='aspect-square w-[34px] rounded-md object-cover'
                unoptimized
              />
            </HoverCardTrigger>
            <HoverCardContent className='w-full max-w-xs'>
              <div className='flex justify-between space-x-4'>
                <Avatar>
                  <AvatarImage
                    src={`${process.env.NEXT_PUBLIC_TMDB_API_BASE_IMAGE_URL}/w185/${p.logo_path}`}
                  />
                  <AvatarFallback>
                    {p.provider_name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className='space-y-1'>
                  <h4 className='text-sm font-semibold'>{p.provider_name}</h4>
                  <p className='text-balance text-sm'>{streaming.description}</p>
                  <div className='flex items-center justify-start pt-1'>
                    <a href={streaming.website} rel='noreferrer' target='_blank'>
                      <Button variant={'link'} className='p-0'>
                        Visitar streaming
                        <ArrowSquareOut size={20} className='ml-2' weight='bold' />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ) : null;
      })}
    </div>
  );
}
