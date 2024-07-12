export type WatchProviderRoot = {
  id: number;
  results: Record<string, Region>;
};

export type Provider = {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
};

// Region/Country type
type Region = {
  link: string;
  buy?: Provider[];
  rent?: Provider[];
  flatrate?: Provider[];
};
