import { NextRequest } from 'next/server';

import { MultiSearchResult, SearchRoot } from '@/types/search';

import { tmdbFetcher } from '@/lib/fetcher';
import { getNextPage } from '@/lib/getters';
import { ratelimit } from '@/lib/rate-limiter';

export async function GET(req: NextRequest) {
  const ip = req.ip ?? '127.0.0.1';

  const { limit, reset, remaining } = await ratelimit.limit(ip);

  if (remaining === 0) {
    return Response.json(
      { error: 'Rate limit execeeded' },
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
    const searchParams = req.nextUrl.searchParams;

    const q = searchParams.get('q') ?? '';
    const page = searchParams.get('page') ?? '1';

    const url = new URL(`${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/search/multi`);
    url.searchParams.append('include_adult', 'false');
    url.searchParams.append('language', 'pt-BR');
    url.searchParams.append('page', page);
    url.searchParams.append('query', q);

    try {
      const data = await tmdbFetcher<SearchRoot<MultiSearchResult>>(url.toString());
      const nextPage = getNextPage({ page: data.page, total_pages: data.total_pages });
      return Response.json({ ...data, nextPage });
    } catch (error) {
      return Response.json({ message: 'Erro interno do servidor' }, { status: 500 });
    }
  }
}
