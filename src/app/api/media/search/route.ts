import { NextRequest } from 'next/server';

import { MultiSearchResult, SearchRoot } from '@/types/search';

import { TMDB_DEFAULT_FETCH_CONFIG } from '@/constants/fetch';

import { fetcher } from '@/lib/fetcher';
import { getNextPage } from '@/lib/getters';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const q = searchParams.get('q') ?? '';
  const page = searchParams.get('page') ?? 1;

  const url = new URL(`${process.env.NEXT_PUBLIC_TMDB_API_BASE_URL}/search/multi`);
  url.searchParams.append('include_adult', 'false');
  url.searchParams.append('language', 'pt-BR');
  url.searchParams.append('page', String(page));
  url.searchParams.append('query', q);

  const data = await fetcher<SearchRoot<MultiSearchResult>>(url.toString(), {
    ...TMDB_DEFAULT_FETCH_CONFIG,
  });

  const nextPage = getNextPage({ page: data.page, total_pages: data.total_pages });

  return Response.json({ ...data, nextPage });
}
