import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { generateTvShowDetailsPromise, getTvShowById } from '@/data/tv';

import { getGenresList, getProductionCompanies } from '@/lib/getters';
import {
  formatTvShowCredits,
  getBrazilianTvShowCertification,
  getCreatorsName,
} from '@/lib/tv-show';

import Image from '@/components/common/Image';

import { CastAndCrewCarousel } from '../../_components/CastAndCrewCarousel';
import { CertificationBadge } from '../../_components/CertificationBadge';
import { CompaniesList } from '../../_components/ExtraDetails';
import {
  NumberOfSeasons,
  Overview,
  Rating,
  ReleaseYear,
} from '../../_components/MediaDetails';
import SeasonTable from '../../_components/SeasonTable';
import { WatchProviders } from '../../_components/WatchProviders';

export async function generateMetadata({ params }: TvShowPageParams): Promise<Metadata> {
  const id = params.id;

  const tvShow = await generateTvShowDetailsPromise(Number(id));

  const genresList = getGenresList(tvShow.genres).map((g) => g.toLowerCase());

  return {
    title: tvShow.name || tvShow.original_name,
    description: tvShow.overview,
    keywords: [tvShow.name, ...genresList],
    category: 'Série',
  };
}

type TvShowPageParams = {
  params: { id: string };
};

export default async function TvShowPage({ params }: TvShowPageParams) {
  if (!params.id) redirect('/');

  const { tvShow, watchProviders, aggregateCredits } = await getTvShowById(
    Number(params.id),
  );

  const credits = formatTvShowCredits(aggregateCredits);

  const contentRating = getBrazilianTvShowCertification(tvShow.content_ratings);

  const creators = getCreatorsName(tvShow.created_by);

  const productionCompanies = getProductionCompanies(tvShow.production_companies);

  return (
    <>
      <Image
        alt={`Pano de fundo do filme ${tvShow.name || tvShow.original_name}`}
        fallback='/img/16x9_image_fallback.png'
        src={`${process.env.NEXT_PUBLIC_TMDB_API_BASE_IMAGE_URL}/original/${tvShow.backdrop_path}`}
        className='media-bg-image-gradient -z-10 max-h-svh w-full object-cover brightness-[.4] max-xs:hidden'
        fill
        loading='eager'
      />
      <Image
        alt={`Poster do filme ${tvShow.name || tvShow.original_name}`}
        fallback='/img/16x9_image_fallback.png'
        src={`${process.env.NEXT_PUBLIC_TMDB_API_BASE_IMAGE_URL}/original/${tvShow.poster_path}`}
        className='media-bg-image-gradient -z-10 aspect-[2/3] max-h-svh object-cover brightness-50 xs:hidden'
        fill
        loading='eager'
      />
      <section className='flex flex-col gap-4 px-4 pt-20 sm:px-10 md:px-20'>
        <WatchProviders providers={watchProviders} />
        <h1 className='text-xl font-bold tracking-wide xs:text-2xl md:text-4xl lg:text-5xl'>
          {tvShow.name || tvShow.original_name}
        </h1>
        <div className='flex items-center gap-x-4'>
          <Rating voteAverage={tvShow.vote_average} voteCount={tvShow.vote_count} />
          <ReleaseYear releaseDate={tvShow.first_air_date} className='text-lg' />
          <NumberOfSeasons
            numberOfSeasons={tvShow.number_of_seasons}
            className='text-lg'
          />
          <CertificationBadge variant={contentRating} />
        </div>
        <p>
          <span className='text-sm font-medium xs:text-lg'>Criado por: </span>
          {!creators || creators?.length === 0 ? '-' : creators.join(', ')}
        </p>
        <Overview overview={tvShow.overview} />
      </section>
      <section className='flex flex-col gap-4 px-4 md:px-20'>
        <SeasonTable
          seasons={tvShow.seasons.filter((s) => s.name !== 'Especiais')}
          tvShowId={tvShow.id}
        />
        <CastAndCrewCarousel persons={credits.cast} title='Elenco' />
        <CastAndCrewCarousel persons={credits.crew} title='Equipe' />
      </section>
      <section className='flex flex-col gap-4 px-4 md:px-20'>
        <h2 className='text-lg font-medium'>Informações extras</h2>
        <div className='flex flex-wrap items-start gap-8 align-top'>
          <CompaniesList companies={productionCompanies} />
        </div>
      </section>
    </>
  );
}
