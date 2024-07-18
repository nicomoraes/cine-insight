import { NextRequest } from 'next/server';

import * as v from 'valibot';

import { TVSeasonRoot } from '@/types/tv-show/season';

import { tmdbFetcher } from '@/lib/fetcher';
import { ratelimit } from '@/lib/rate-limiter';

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

export async function GET(req: NextRequest, { params }: Params) {
  const ip = req.ip ?? '127.0.0.1';

  const { limit, reset, remaining } = await ratelimit.limit(ip);

  if (remaining === 0) {
    return Response.json(
      { error: 'Limite de taxa excedido' },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': reset.toString(),
        },
      },
    );
  } else {
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
}
