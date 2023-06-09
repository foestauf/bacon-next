import type { AxiosInstance } from 'axios';

import type { MovieCredits, MovieDetails } from './types';

export class TMDBMovies {
  apiClient: AxiosInstance;

  constructor(apiClient: AxiosInstance) {
    this.apiClient = apiClient;
  }

  async getMovie(id: string) {
    const { data: details } = await this.apiClient.get<MovieDetails>(
      `/movie/${id}`,
    );
    const { data: credits } = await this.apiClient.get<MovieCredits>(
      `/movie/${id}/credits`,
    );
    // filter credits to only include cast members
    const cast = credits.cast.filter(
      (member: any) => member.known_for_department === 'Acting',
    );
    const data = { ...details, credits: cast };
    return data;
  }

  async populateCast(movieId: number) {
    const { data: credits } = await this.apiClient.get<MovieCredits>(
      `/movie/${movieId}/credits`,
    );
    // filter credits to only include cast members
    const cast = credits.cast.filter(
      (member: any) => member.known_for_department === 'Acting',
    );
    return cast;
  }
}
