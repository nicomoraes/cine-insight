import { redirect } from 'next/navigation';

import { getCollectionById } from '@/data/media';
import { getOneMovieById } from '@/data/movie';

import {
  extractDirectorsFromCredits,
  formatMovieCredits,
  getBrazilianMovieCertification,
} from '@/lib/movie';

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

  const { movie, watchProviders } = await getOneMovieById(Number(params.id));

  const { cast, crew } = formatMovieCredits(movie.credits);

  const directors = extractDirectorsFromCredits(movie.credits);

  const certification = getBrazilianMovieCertification(movie.releases);

  return (
    <>
      <Image
        alt={`Pano de fundo do filme ${movie.title || movie.original_title}`}
        fallback='/img/16x9_image_fallback.png'
        src={`${process.env.NEXT_PUBLIC_TMDB_API_BASE_IMAGE_URL}/original/${movie.backdrop_path}`}
        className='mask1 -z-10 max-h-svh w-full object-cover brightness-50 max-xs:hidden'
        fill
      />
      <Image
        alt={`Poster do filme ${movie.title || movie.original_title}`}
        fallback='/img/16x9_image_fallback.png'
        src={`${process.env.NEXT_PUBLIC_TMDB_API_BASE_IMAGE_URL}/original/${movie.poster_path}`}
        className='mask1 -z-10 aspect-[2/3] max-h-svh object-cover brightness-50 xs:hidden'
        fill
      />
      <section className='flex flex-col gap-4 px-4 pt-20 sm:px-10 md:px-20'>
        <WatchProviders providers={watchProviders} />
        <h1 className='text-xl font-bold tracking-wide xs:text-2xl md:text-4xl lg:text-5xl'>
          {movie.title || movie.original_title}
        </h1>
        <div className='flex items-center gap-x-4'>
          <Rating voteAverage={movie.vote_average} voteCount={movie.vote_count} />
          <ReleaseYear releaseDate={movie.release_date} className='text-lg' />
          <Runtime runtime={movie.runtime} className='text-lg' />
          <CertificationBadge variant={certification} />
        </div>
        {directors.length > 0 && (
          <p>
            <span className='text-sm font-medium xs:text-lg'>Direção: </span>
            {directors.join(', ')}
          </p>
        )}
        {movie.overview && (
          <p className='max-w-xl text-balance text-foreground/90 max-xs:text-sm'>
            {movie.overview}
          </p>
        )}
      </section>
      <section className='space-y-4 px-4 pb-6 pt-10 md:px-20'>
        {movie.belongs_to_collection && (
          <CollectionCarousel
            queryFn={() => getCollectionById(movie.belongs_to_collection.id)}
            title='Coleção'
          />
        )}
        <CastAndCrewCarousel persons={cast} title='Elenco' />
        <CastAndCrewCarousel persons={crew} title='Equipe' />
      </section>
    </>
  );
}
