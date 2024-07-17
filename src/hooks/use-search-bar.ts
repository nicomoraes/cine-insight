'use client';

import { FormEvent, useCallback, useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

export function useSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    setQuery(params.get('q') ?? '');
  }, [searchParams]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.length === 0) return;
    router.push('/' + '?' + createQueryString([['q', query]]));
  };

  const createQueryString = useCallback(
    (queries: [string, string][]) => {
      const params = new URLSearchParams(searchParams.toString());
      queries.forEach((q) => {
        const [key, value] = q;
        if (params.get(key)) return params.set(key, value);
        if (value) return params.append(key, value);
      });
      return params.toString();
    },
    [searchParams],
  );

  const resetSearch = () => {
    router.push('/');
    setQuery('');
  };

  return {
    query,
    setQuery,
    onSubmit,
    resetSearch,
    searchParams,
  };
}
