export function formatUsdCurrency(number: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'USD',
  }).format(number);
}

export function getFullYear(dateAsString: string) {
  return new Date(dateAsString).getFullYear();
}

export function getPtBrReleaseDate(dateAsString: string) {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(dateAsString));
}

export function formatToStarRating(note: number) {
  const convertedNote = note / 2;
  const roundedNote = Math.round(convertedNote * 2) / 2;
  const fullStars = Math.floor(roundedNote);
  const halfStars = roundedNote - fullStars === 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;
  return { fullStars, halfStars, emptyStars };
}
