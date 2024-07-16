import { NextRequest } from 'next/server';

import * as v from 'valibot';

import { TVSeasonRoot } from '@/types/tv-show/season';

import { tmdbFetcher } from '@/lib/fetcher';

const paramsSchema = v.object({
  id: v.pipe(
    v.string(),
    v.transform((input) => Number(input)),
    v.minValue(-2147483648),
    v.maxValue(2147483647),
  ),
  seasonNumber: v.pipe(
    v.string(),
    v.transform((input) => Number(input)),
    v.minValue(0),
    v.maxValue(2147483647),
  ),
});

type Params = { params: { id: string; seasonNumber: string } };

export async function GET(_req: NextRequest, { params }: Params) {
  const tvShowIdSchemaResult = v.safeParse(paramsSchema, params);

  if (!tvShowIdSchemaResult.success) {
    return Response.json({ message: 'Parâmetros inválidos' }, { status: 422 });
  }

  const url = new URL(
    `${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/tv/${tvShowIdSchemaResult.output.id}/season/${tvShowIdSchemaResult.output.seasonNumber}`,
  );

  url.searchParams.append('language', 'pt-BR');

  const data = await tmdbFetcher<TVSeasonRoot>(url.toString());

  return Response.json(data);
}
