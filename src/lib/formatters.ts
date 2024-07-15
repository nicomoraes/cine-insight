export function formatNumberToUsdCurrency(number: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'USD',
  }).format(number);
}

export function formatReleaseDateToPtBrDate(dateAsString: string) {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(dateAsString));
}

export function formatMinutesToRuntimeString(runtime: number) {
  const hours = Math.floor(runtime / 60);
  const remainingMinutes = runtime % 60;
  return hours > 0
    ? `${hours}h ${String(remainingMinutes).padStart(2, '0')}min`
    : `${remainingMinutes}min`;
}

export function formatVoteAverageToStarRating(voteAverage: number) {
  const convertedNote = voteAverage / 2;
  const roundedNote = Math.round(convertedNote * 2) / 2;
  const fullStars = Math.floor(roundedNote);
  const halfStars = roundedNote - fullStars === 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;
  return { fullStars, halfStars, emptyStars };
}
