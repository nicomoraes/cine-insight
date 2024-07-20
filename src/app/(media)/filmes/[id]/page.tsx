import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { getCollectionById } from '@/data/media';
import { generateMovieDetailsPromise, getOneMovieById } from '@/data/movie';

import { getGenresList, getProductionCompanies } from '@/lib/getters';
import {
  extractDirectorsFromCredits,
  formatMovieCredits,
  getBrazilianMovieCertification,
} from '@/lib/movie';

import Image from '@/components/common/Image';

import { CastAndCrewCarousel } from '../../_components/CastAndCrewCarousel';
import { CertificationBadge } from '../../_components/CertificationBadge';
import CollectionCarousel from '../../_components/CollectionCarousel';
import { CollectionCarouselError } from '../../_components/CollectionCarouselError';
import { CompaniesList, FinacialResults } from '../../_components/ExtraDetails';
import { Overview, Rating, ReleaseYear, Runtime } from '../../_components/MediaDetails';
import { WatchProviders } from '../../_components/WatchProviders';

export async function generateMetadata({ params }: MoviePageParams): Promise<Metadata> {
  const id = params.id;

  const movie = await generateMovieDetailsPromise(Number(id));

  const genresList = getGenresList(movie.genres).map((g) => g.toLowerCase());

  return {
    title: movie.title,
    description: movie.overview,
    keywords: [movie.title, ...genresList],
    category: 'Filme',
  };
}

type MoviePageParams = {
  params: { id: string };
};

export default async function MoviePage({ params }: MoviePageParams) {
  if (!params.id) redirect('/');

  const { movie, watchProviders } = await getOneMovieById(Number(params.id));

  const { cast, crew } = formatMovieCredits(movie.credits);

  const directors = extractDirectorsFromCredits(movie.credits);

  const certification = getBrazilianMovieCertification(movie.releases);

  const productionCompanies = getProductionCompanies(movie.production_companies);

  return (
    <>
      <Image
        alt={`Pano de fundo do filme ${movie.title || movie.original_title}`}
        fallback='/img/16x9_image_fallback.png'
        src={`${process.env.NEXT_PUBLIC_TMDB_API_BASE_IMAGE_URL}/original/${movie.backdrop_path}`}
        className='media-bg-image-gradient -z-10 max-h-svh w-full object-cover brightness-50 max-xs:hidden'
        fill
      />
      <Image
        alt={`Poster do filme ${movie.title || movie.original_title}`}
        fallback='/img/16x9_image_fallback.png'
        src={`${process.env.NEXT_PUBLIC_TMDB_API_BASE_IMAGE_URL}/original/${movie.poster_path}`}
        className='media-bg-image-gradient -z-10 aspect-[2/3] max-h-svh object-cover brightness-50 xs:hidden'
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
        <p>
          <span className='text-sm font-medium xs:text-lg'>Direção: </span>
          {!directors || directors?.length === 0 ? '-' : directors.join(', ')}
        </p>
        <Overview overview={movie.overview} />
      </section>
      <section className='flex flex-col gap-4 px-4 md:px-20'>
        {movie.belongs_to_collection && (
          <CollectionCarouselError>
            <CollectionCarousel
              queryFn={() => getCollectionById(movie.belongs_to_collection.id)}
              title='Coleção'
            />
          </CollectionCarouselError>
        )}
        <CastAndCrewCarousel persons={cast} title='Elenco' />
        <CastAndCrewCarousel persons={crew} title='Equipe' />
      </section>
      <section className='flex flex-col gap-6 px-4 md:px-20'>
        <h2 className='text-lg font-medium'>Informações extras</h2>
        <div className='flex flex-wrap items-start gap-8 align-top'>
          <CompaniesList companies={productionCompanies} />
          <FinacialResults budget={movie.budget} revenue={movie.revenue} />
        </div>
      </section>
    </>
  );
}
