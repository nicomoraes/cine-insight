import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
  return (
    <main className='min-h-svh w-full px-10 pt-24'>
      <div className='col mx-auto flex max-w-xl flex-col gap-2'>
        <h1 className='text-center text-4xl font-bold'>Next Movies</h1>
        <p className='text-center text-2xl'>
          Encontre informações completas de filmes e séries
        </p>
        <div className='mx-auto flex w-full max-w-md gap-2'>
          <Input placeholder='Digite o nome do Filme ou Série que deseja encontrar' />
          <Button aria-label='Pesquisar'>
            <MagnifyingGlass size={24} />
          </Button>
        </div>
      </div>
    </main>
  );
}
