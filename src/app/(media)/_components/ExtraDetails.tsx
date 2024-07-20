import { formatNumberToUsdCurrency } from '@/lib/formatters';

import { Separator } from '@/components/ui/separator';

type CompaniesListProps = {
  companies: string[] | null;
};

export function CompaniesList({ companies }: CompaniesListProps) {
  return (
    <div className='relative flex w-full min-w-[200px] max-w-lg flex-col rounded-md border px-6 py-4 sm:w-max'>
      <h3 className='absolute -top-3 left-2 bg-background px-2 font-medium text-foreground/40'>
        Produtoras
      </h3>
      <p className='flex items-center gap-4'>
        {!companies || companies.length === 0 ? '-' : companies.join(', ')}
      </p>
    </div>
  );
}

type FinacialResultsProps = {
  budget: number | null;
  revenue: number | null;
};

export function FinacialResults({ budget, revenue }: FinacialResultsProps) {
  return (
    <div className='relative flex w-full flex-col rounded-md border px-6 py-4 sm:w-max'>
      <h3 className='absolute -top-3 left-2 bg-background px-2 font-medium text-foreground/40'>
        Resultados financeiros
      </h3>
      <div className='flex h-max w-full gap-4 max-sm:flex-col sm:w-max sm:items-center'>
        <div className='flex flex-wrap gap-2'>
          <h4 className='font-medium'>Orçamento: </h4>
          <span>{budget ? formatNumberToUsdCurrency(budget) : '-'}</span>
        </div>
        <Separator orientation='vertical' className='max-sm:hidden sm:h-4' />
        <Separator orientation='horizontal' className='w-full sm:hidden' />
        <div className='flex flex-wrap gap-2'>
          <h4 className='font-medium'>Receita: </h4>
          <span>{revenue ? formatNumberToUsdCurrency(revenue) : '-'}</span>
        </div>
      </div>
    </div>
  );
}
