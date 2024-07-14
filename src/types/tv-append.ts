export interface AppendedContentRatings {
  results: AppendedContentRatingResult[];
  id: number;
}

export interface AppendedContentRatingResult {
  descriptors: unknown[];
  iso_3166_1: string;
  rating: string;
}
