import { redirect } from 'next/navigation';

import { getTvShowById } from '@/data/tv';

import { getTvShowBrazilCertification } from '@/lib/getters';

import Image from '@/components/common/Image';

import { CastAndCrewCarousel } from '../../_components/CastAndCrewCarousel';
import { CertificationBadge } from '../../_components/CertificationBadge';
import { NumberOfSeasons, Rating, ReleaseYear } from '../../_components/MediaDetails';
import SeasonTable from '../../_components/SeasonTable';
import { WatchProviders } from '../../_components/WatchProviders';

type TvShowPageParams = {
  params: { id: string };
};

export default async function TvShowPage({ params }: TvShowPageParams) {
  if (!params.id) redirect('/');

  const { data, watchProviders, credits } = await getTvShowById(Number(params.id));

  return (
    <>
      <Image
        alt={`Pano de fundo do filme ${data.name || data.original_name}`}
        fallback='/img/16x9_image_fallback.png'
        src={`${process.env.NEXT_PUBLIC_TMDB_API_BASE_IMAGE_URL}/original/${data.backdrop_path}`}
        className='mask1 -z-10 max-h-svh w-full object-cover brightness-[.4] max-xs:hidden'
        fill
      />
      <Image
        alt={`Poster do filme ${data.name || data.original_name}`}
        fallback='/img/16x9_image_fallback.png'
        src={`${process.env.NEXT_PUBLIC_TMDB_API_BASE_IMAGE_URL}/original/${data.poster_path}`}
        className='mask1 -z-10 aspect-[2/3] max-h-svh object-cover brightness-50 xs:hidden'
        fill
      />
      <div className='flex flex-col gap-4 px-4 pt-20 sm:px-10 md:px-20'>
        <WatchProviders providers={watchProviders} />
        <h1 className='text-xl font-bold tracking-wide xs:text-2xl md:text-4xl lg:text-5xl'>
          {data.name || data.original_name}
        </h1>
        <div className='flex items-center gap-x-4'>
          <Rating voteAverage={data.vote_average} voteCount={data.vote_count} />
          <ReleaseYear releaseDate={data.first_air_date} className='text-lg' />
          <NumberOfSeasons numberOfSeasons={data.number_of_seasons} className='text-lg' />
          <CertificationBadge
            variant={getTvShowBrazilCertification(data.content_ratings)}
          />
        </div>
        {data.created_by.length > 0 && (
          <p>
            <span className='text-sm font-medium xs:text-lg'>Criado por: </span>
            {data.created_by.map((cr) => cr.name).join(', ')}
          </p>
        )}
        {data.overview && (
          <p className='max-w-xl text-balance text-foreground/90 max-xs:text-sm'>
            {data.overview}
          </p>
        )}
      </div>
      <div className='space-y-4 px-4 pb-6 pt-10 sm:px-20'>
        <SeasonTable
          seasons={data.seasons.filter((s) => s.name !== 'Especiais')}
          tvShowId={data.id}
        />
        <CastAndCrewCarousel persons={credits.cast} title='Elenco' />
        <CastAndCrewCarousel persons={credits.crew} title='Equipe' />
      </div>
    </>
  );
}
