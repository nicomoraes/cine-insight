export type StreamingService = {
  name: string;
  colors: string[];
  website: string;
  description: string;
  channels?: StreamingService[];
};

export const STREAMINGS: StreamingService[] = [
  {
    name: 'Amazon Prime Video',
    colors: ['#00A8E1', '#FFFFFF'],
    website: 'https://www.primevideo.com',
    description:
      'Plataforma de streaming da Amazon, oferecendo uma vasta biblioteca de filmes, séries e produções originais.',
    channels: [
      {
        name: 'Max Amazon Channel',
        colors: ['#003087', '#FFFFFF'],
        website:
          'https://www.primevideo.com/region/na/channel/5f0d312d-51d8-48d3-9b32-f64a971f5c77',
        description:
          'Canal de streaming da Max disponível através do Amazon Prime Video Channels.',
      },
      {
        name: 'Looke Amazon Channel',
        colors: ['#FF6F00', '#000000'],
        website:
          'https://www.primevideo.com/region/na/offers/ref=atv_hm_sto_c_tkySza_ZVe9Dl_4_7?benefitId=lookebr',
        description:
          'Canal de streaming da Looke disponível através do Amazon Prime Video Channels.',
      },
      {
        name: 'Paramount+ Amazon Channel',
        colors: ['#0A66C2', '#FFFFFF'],
        website:
          'https://www.primevideo.com/region/na/offers/ref=atv_hm_hom_c_X7fVlJ_rZjg4U_4_5?benefitId=paramountplusbr',
        description:
          'Canal de streaming da Paramount Plus disponível através do Amazon Prime Video Channels.',
      },
      {
        name: 'MUBI Amazon Channel',
        colors: ['#000000', '#FFFFFF'],
        website:
          'https://www.primevideo.com/region/na/offers/ref=atv_hm_sto_c_tkySza_9VOIbK_4_9?benefitId=mubibr',
        description:
          'Canal de streaming da MUBI disponível através do Amazon Prime Video Channels.',
      },
      {
        name: 'CurtaOn Amazon Channel',
        colors: ['#000000', '#FFFFFF'],
        website:
          'https://www.primevideo.com/region/na/offers/ref=atv_hm_sto_c_tkySza_PEvcah_4_17?benefitId=curtaonbr',
        description:
          'Canal de streaming da CurtaOn disponível através do Amazon Prime Video Channels.',
      },
      {
        name: 'Stingray Amazon Channel',
        colors: ['#00A8E1', '#FFFFFF'],
        website:
          'https://www.primevideo.com/region/na/offers/ref=atv_hm_sto_c_tkySza_OEqRdk_4_15?benefitId=stingraybr',
        description:
          'Canal de streaming da Stingray disponível através do Amazon Prime Video Channels.',
      },
    ],
  },
  {
    name: 'Netflix',
    colors: ['#E50914', '#221F1F', '#FFFFFF'],
    website: 'https://www.netflix.com',
    description:
      'Líder mundial em streaming de séries, filmes e documentários originais e licenciados.',
  },
  {
    name: 'Max',
    colors: ['#003087', '#FFFFFF'],
    website: 'https://www.max.com',
    description:
      'Serviço de streaming da Warner Bros. Discovery que combina conteúdo da HBO, Warner Bros., Discovery+ e outras marcas.',
  },
  {
    name: 'Disney Plus',
    colors: ['#113CCF', '#FFFFFF'],
    website: 'https://www.disneyplus.com',
    description:
      'Serviço de streaming da Disney, oferecendo conteúdo da Disney, Pixar, Marvel, Star Wars e National Geographic.',
  },
  {
    name: 'Apple TV',
    colors: ['#A3AAAE', '#000000', '#FFFFFF'],
    website: 'https://www.apple.com/apple-tv-app/',
    description:
      'Plataforma de streaming da Apple que oferece aluguel e compra de filmes e séries.',
  },
  {
    name: 'Apple TV Plus',
    colors: ['#A3AAAE', '#000000', '#FFFFFF'],
    website: 'https://tv.apple.com',
    description:
      'Serviço de streaming da Apple com produções originais, incluindo séries, filmes e documentários.',
  },
  {
    name: 'Looke',
    colors: ['#FF6F00', '#000000'],
    website: 'https://www.looke.com.br',
    description:
      'Plataforma brasileira de streaming com uma vasta seleção de filmes e séries.',
  },
  {
    name: 'Crunchyroll',
    colors: ['#F47521', '#FFFFFF'],
    website: 'https://www.crunchyroll.com',
    description:
      'Plataforma de streaming focada em animes, com uma vasta biblioteca de títulos populares e exclusivos.',
  },
  {
    name: 'MUBI',
    colors: ['#000000', '#FFFFFF'],
    website: 'https://www.mubi.com',
    description:
      'Serviço de streaming especializado em filmes independentes, clássicos e premiados.',
  },
  {
    name: 'Paramount Plus',
    colors: ['#0A66C2', '#FFFFFF'],
    website: 'https://www.paramountplus.com',
    description:
      'Serviço de streaming com conteúdo da CBS, BET, Comedy Central, Nickelodeon, MTV, entre outros.',
  },
  {
    name: 'Globoplay',
    colors: ['#EE2D31', '#FFFFFF'],
    website: 'https://globoplay.globo.com',
    description:
      'Serviço de streaming da Globo, oferecendo novelas, séries, filmes e conteúdo exclusivo.',
  },
  {
    name: 'NOW',
    colors: ['#003A72', '#FFFFFF'],
    website: 'https://www.nowonline.com.br',
    description:
      'Serviço de streaming da Claro, oferecendo uma ampla seleção de filmes, séries e programas de TV.',
  },
  {
    name: 'Telecine',
    colors: ['#FF0000', '#FFFFFF'],
    website: 'https://www.telecineplay.com.br',
    description:
      'Plataforma de streaming brasileira com uma vasta coleção de filmes, incluindo lançamentos e clássicos.',
  },
];
