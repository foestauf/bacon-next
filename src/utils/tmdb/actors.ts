import type { AxiosInstance } from 'axios';

import type { ActorResponse, MovieCreditsResponse } from './types';

export class TMDBActors {
  apiClient: AxiosInstance;

  constructor(apiClient: AxiosInstance) {
    this.apiClient = apiClient;
  }

  async getActor(id: string | number) {
    let response: ActorResponse & {
      movieCredits: MovieCreditsResponse['cast'];
    } = {} as ActorResponse & { movieCredits: MovieCreditsResponse['cast'] };
    try {
      const { data: details } = await this.apiClient.get<ActorResponse>(
        `/person/${id}`,
      );
      const { data: movieCredits } =
        await this.apiClient.get<MovieCreditsResponse>(
          `/person/${id}/movie_credits`,
        );
      response = { ...details, movieCredits: movieCredits.cast };
    } catch (error) {
      console.log('error', error);
    }
    return response;
  }
}
