import { SearchRoot, SingleSearchResult } from '@/types/search';

type GetNextPageOptions = Pick<SearchRoot<SingleSearchResult>, 'page' | 'total_pages'>;

export function getNextPage({ page, total_pages }: GetNextPageOptions) {
  const hasNextPage = page + 1 < total_pages;
  const nextPage = hasNextPage ? page + 1 : null;
  return nextPage;
}
