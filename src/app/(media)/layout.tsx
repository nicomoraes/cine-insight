import BackToTopButton from '@/components/common/BackToTopButton';

import TopNav from './_components/TopNav';

export default async function MediaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <TopNav />
      <BackToTopButton />
      <main className='relative flex min-h-svh w-full flex-col gap-6'>{children}</main>
    </>
  );
}
