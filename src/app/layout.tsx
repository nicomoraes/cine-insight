import './globals.css';

import type { Metadata } from 'next';

import { satoshi } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Next Movies',
  description: 'Encontre todas as informções de filmes e séries',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR'>
      <body className={`${satoshi.variable}`}>{children}</body>
    </html>
  );
}
