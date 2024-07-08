export const TMDB_DEFAULT_FETCH_CONFIG = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TMDB_API_BEARER}`,
  },
};
