import { NextRequest } from 'next/server';

import { TVSeasonRoot } from '@/types/tv-season';

import { TMDB_DEFAULT_FETCH_CONFIG } from '@/constants/fetch';

import { fetcher } from '@/lib/fetcher';

type Params = { params: { seasonNumber: string } };

export async function GET(req: NextRequest, { params: { seasonNumber } }: Params) {
  const searchParams = req.nextUrl.searchParams;

  const tvShowId = searchParams.get('tvShowId') ?? '';

  const url = new URL(
    `${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/tv/${tvShowId}/season/${seasonNumber}`,
  );

  url.searchParams.append('language', 'pt-BR');

  const data = await fetcher<TVSeasonRoot>(url.toString(), TMDB_DEFAULT_FETCH_CONFIG);

  return Response.json(data);
}
