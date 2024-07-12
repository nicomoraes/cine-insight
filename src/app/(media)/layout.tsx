import TopNav from './_components/TopNav';

export default async function MediaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <TopNav />
      <main className='relative min-h-svh w-full'>{children}</main>;
    </>
  );
}
