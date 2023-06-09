import axios from 'axios';

import { TMDBActors } from './actors';
import { TMDBMovies } from './movies';

class TmdbClient {
  apiClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  });

  movies = new TMDBMovies(this.apiClient);

  actors = new TMDBActors(this.apiClient);
}

export const tmdbClient = new TmdbClient();
