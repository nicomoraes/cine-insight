'use client';

import { useState } from 'react';

import { SmileySad } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';

import { Season } from '@/types/tv-show';

import { getTvShowSeasonFromRouteHandler } from '@/data/tv';

import { generateRandonKey } from '@/lib/generators';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Rating, ReleaseDate, Runtime } from './MediaDetails';

type SeasonTableProps = {
  tvShowId: number;
  seasons: Season[];
};

export default function SeasonTable({ tvShowId, seasons }: SeasonTableProps) {
  const [seasonNumber, setSeasonNumber] = useState(seasons[0].season_number);

  const { data, isPending, status } = useQuery({
    queryKey: ['tv_show_season', tvShowId, seasonNumber],
    queryFn: () => getTvShowSeasonFromRouteHandler({ tvShowId, seasonNumber }),
  });

  if (status === 'error')
    return (
      <Alert
        variant={'destructive'}
        className='w-max bg-destructive text-destructive-foreground'
      >
        <SmileySad size={24} className='shrink-0 fill-destructive-foreground' />
        <AlertTitle>Erro ao carregar temporadas</AlertTitle>
        <AlertDescription>
          Desculpe, houve um problema ao carregar as temporadas.
        </AlertDescription>
      </Alert>
    );

  return (
    <div className='flex w-full flex-col gap-4'>
      <h2 className='font-medium'>Temporadas e Episódios</h2>
      <Select
        onValueChange={(v) => setSeasonNumber(Number(v))}
        value={String(seasonNumber)}
      >
        <SelectTrigger className='max-w-xs' aria-label='Selecionar temporada da série'>
          <SelectValue placeholder='Selecione a temporada' />
        </SelectTrigger>
        <SelectContent>
          {seasons.map((season, index) => {
            return (
              <SelectItem
                className='flex items-center gap-2'
                key={generateRandonKey({ prefix: `season_${index}` })}
                value={String(season.season_number)}
              >
                {season.name} -{' '}
                <span className='text-muted-foreground'>
                  {season.episode_count} episódios
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      {isPending && <TableSkeleton />}
      {!isPending && status === 'success' && (
        <div className='overflow-hidden rounded-md border'>
          <Table className='bg-background'>
            <TableHeader>
              <TableRow className='w-full whitespace-nowrap'>
                <TableHead>Nº do epsódio</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Avaliação</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead>Data de lançamento</TableHead>
                <TableHead>Direção</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.episodes.length > 0 ? (
                data?.episodes.map((ep) => (
                  <TableRow key={ep.id} className='whitespace-nowrap'>
                    <TableCell className='font-medium'>{ep.episode_number}</TableCell>
                    <TableCell className='font-medium'>{ep.name}</TableCell>
                    <TableCell>
                      <Rating voteAverage={ep.vote_average} voteCount={ep.vote_count} />
                    </TableCell>
                    <TableCell>
                      <Runtime runtime={ep.runtime} />
                    </TableCell>
                    <TableCell>
                      <ReleaseDate releaseDate={ep.air_date} />
                    </TableCell>
                    <TableCell>
                      {ep.crew
                        .filter((c) => c.job === 'Director')
                        .map((c) => c.name)
                        .join(', ') || '-'}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className='h-24 bg-info text-center text-info-foreground'
                  >
                    Não há informações sobre os episódios da temporada temporada
                    selecionada.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className='rounded-md border'>
      <Table>
        <TableHeader>
          <TableRow className='h-[61px] w-full'>
            <TableHead>Nº do epsódio</TableHead>
            <TableHead>Título</TableHead>
            <TableHead>Avaliação</TableHead>
            <TableHead>Duração</TableHead>
            <TableHead>Data de lançamento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(8)
            ?.fill(0)
            .map(() => (
              <TableRow key={generateRandonKey({})}>
                <TableCell>
                  <Skeleton className='h-4 w-[179px]' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-[337px]' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-[218px]' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-[234px]' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-[210px]' />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function SeasonTableSkeleton() {
  return (
    <div className='flex w-full flex-col gap-4'>
      <Skeleton className='h-6 w-[120px]' />
      <Skeleton className='h-8 max-w-xs' />
      <div className='overflow-hidden rounded-md border'>
        <Table className='bg-background'>
          <TableHeader>
            <TableRow className='h-[61px] w-full bg-background'>
              <TableHead>
                <Skeleton className='h-4 w-[179px]' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-4 w-[337px]' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-4 w-[218px]' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-4 w-[234px]' />
              </TableHead>
              <TableHead>
                <Skeleton className='h-4 w-[210px]' />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(8)
              ?.fill(0)
              .map(() => (
                <TableRow key={generateRandonKey({})}>
                  <TableCell>
                    <Skeleton className='h-4 w-[179px]' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-[337px]' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-[218px]' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-[234px]' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-4 w-[210px]' />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
