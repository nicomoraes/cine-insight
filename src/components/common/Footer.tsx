import Image from 'next/image';

export const dynamic = 'force-dynamic';

export function Footer() {
  return (
    <footer className='w-full py-10'>
      <div className='flex w-full flex-col items-center justify-center gap-2'>
        <Image
          width={408}
          height={161}
          className='w-full max-w-[100px] object-cover'
          src={'/img/powered_by_tmdb.png'}
          alt='Powered By TMDB'
        />
        <p className='text-center max-sm:text-sm'>
          &copy; {new Date().getFullYear()} CineInsight por{' '}
          <a
            href='https://www.nicolasmoraes.com/'
            rel='noreferrer'
            target='_blank'
            className='font-bold underline underline-offset-2 duration-150 hover:text-foreground/80'
          >
            Nicolas Moraes
          </a>
        </p>
      </div>
    </footer>
  );
}
