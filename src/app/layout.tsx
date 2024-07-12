import './globals.css';

import type { Metadata } from 'next';

import { satoshi } from '@/lib/fonts';

import { Providers } from '@/components/Providers';
import { TailwindIndicator } from '@/components/common/TailwindIndicator';

export const metadata: Metadata = {
  title: 'Next Movies',
  description: 'Encontre todas as informções de filmes e séries',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR'>
      <body className={`${satoshi.variable}`}>
        <Providers>
          {modal}
          {children}
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
