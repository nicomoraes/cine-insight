import './globals.css';

import type { Metadata } from 'next';

import { satoshi } from '@/lib/fonts';

import { Providers } from '@/components/Providers';
import { TailwindIndicator } from '@/components/common/TailwindIndicator';

export const metadata: Metadata = {
  title: {
    template: '%s | CineInsight',
    default: 'CineInsight',
  },
  description:
    'Detalhes estruturados e informativos que enriquecem a experiência ao fornecer informações essenciais sobre filmes e séries, como título, diretor, elenco, gênero, sinopse, classificação e outras características relevantes para facilitar a navegação e descoberta de conteúdo.',
  keywords: [
    'filmes',
    'séries',
    'streaming',
    'cinema',
    'sinopse',
    'elenco',
    'crítica',
    'lançamentos',
    'estreias',
    'temporadas',
    'Netflix',
    'Amazon Prime Video',
    'Disney+',
    'HBO Max',
    'Globoplay',
    'Apple TV+',
    'Paramount+',
    'Star+',
    'Telecine',
    'MUBI',
    'Looke',
    'NOW',
    'Claro TV+',
  ],
  creator: 'Nicolas Moraes',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='pt-BR'>
      <body className={`${satoshi.variable}`}>
        <Providers>
          {children}
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
