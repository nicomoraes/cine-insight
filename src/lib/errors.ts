import { notFound } from 'next/navigation';

import { TmdbErrorResponse } from '@/types/tmdb-errors';

export class TmdbResponseError extends Error {
  response: TmdbErrorResponse;
  constructor(message: string, res: TmdbErrorResponse) {
    super(message);
    this.response = res;
    this.name = 'TmdbErrorResponse';
  }
}

const notFoundErrorCodes = [6, 34, 37];

export function handlePossibleNotFoundError(error: unknown) {
  if (error instanceof TmdbResponseError) {
    if (notFoundErrorCodes.includes(error.response.status_code)) return notFound();
  }
  throw new Error('Opa, algo de errado aconteceu');
}
