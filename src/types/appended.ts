export type AppendedReleases = {
  countries: AppendedReleaseCountry[];
};

type AppendedReleaseCountry = {
  certification: string;
  descriptors: string[];
  iso_3166_1: string;
  primary: boolean;
  release_date: string;
};

export type AppendedCredits = {
  cast: AppendedCastMember[];
  crew: AppendedCrewMember[];
};

export type AppendedCastMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type AppendedCrewMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
};
