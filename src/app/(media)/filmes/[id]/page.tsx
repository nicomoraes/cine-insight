import { redirect } from 'next/navigation';

import { getCollectionById } from '@/data/media';
import { getOneMovieById } from '@/data/movie';

import {
  getDirectorsFromAppendedCredits,
  getMovieBrazilCertification,
  getMoviePersonsFromAppendedCredits,
} from '@/lib/getters';

import Image from '@/components/common/Image';

import { CastAndCrewCarousel } from '../../_components/CastAndCrewCarousel';
import { CertificationBadge } from '../../_components/CertificationBadge';
import CollectionCarousel from '../../_components/CollectionCarousel';
import { Rating, ReleaseYear, Runtime } from '../../_components/MediaDetails';
import { WatchProviders } from '../../_components/WatchProviders';

type MoviePageParams = {
  params: { id: string };
};

export default async function MoviePage({ params }: MoviePageParams) {
  if (!params.id) redirect('/');

  const { data, watchProviders } = await getOneMovieById(Number(params.id));

  const { cast, crew } = getMoviePersonsFromAppendedCredits(data.credits);
  return (
    <>
      <Image
        alt={`Pano de fundo do filme ${data.title || data.original_title}`}
        fallback='/img/16x9_image_fallback.png'
        src={`${process.env.NEXT_PUBLIC_TMDB_API_BASE_IMAGE_URL}/original/${data.backdrop_path}`}
        className='mask1 -z-10 max-h-svh w-full object-cover brightness-50 max-xs:hidden'
        fill
      />
      <Image
        alt={`Poster do filme ${data.title || data.original_title}`}
        fallback='/img/16x9_image_fallback.png'
        src={`${process.env.NEXT_PUBLIC_TMDB_API_BASE_IMAGE_URL}/original/${data.poster_path}`}
        className='mask1 -z-10 aspect-[2/3] max-h-svh object-cover brightness-50 xs:hidden'
        fill
      />
      <div className='flex flex-col gap-4 px-4 pt-96 sm:px-10 md:px-20'>
        <WatchProviders providers={watchProviders} />
        <h1 className='text-xl font-bold tracking-wide xs:text-2xl md:text-4xl lg:text-5xl'>
          {data.title || data.original_title}
        </h1>
        <div className='flex items-center gap-x-4'>
          <Rating voteAverage={data.vote_average} />
          <ReleaseYear releaseDate={data.release_date} />
          <Runtime runtime={data.runtime} />
          <CertificationBadge variant={getMovieBrazilCertification(data.releases)} />
        </div>
        {getDirectorsFromAppendedCredits(data.credits).length != 0 && (
          <p>
            <span className='text-sm font-medium xs:text-lg'>Direção: </span>
            {getDirectorsFromAppendedCredits(data.credits).join(', ')}
          </p>
        )}
        {data.overview && (
          <p className='max-w-xl text-balance text-foreground/90 max-xs:text-sm'>
            {data.overview}
          </p>
        )}
      </div>
      <div className='space-y-4 px-4 pb-6 pt-10 sm:px-20'>
        <CastAndCrewCarousel persons={cast} title='Elenco' />
        <CastAndCrewCarousel persons={crew} title='Equipe' />
        {data.belongs_to_collection && (
          <CollectionCarousel
            queryFn={() => getCollectionById(data.belongs_to_collection.id)}
            title='Coleção'
          />
        )}
      </div>
    </>
  );
}
