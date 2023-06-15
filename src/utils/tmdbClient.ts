import Client from 'tmdbrjs';

const tmdbClient = new Client({
  apiKey: process.env.TMDB_API_KEY!,
});

export default tmdbClient;