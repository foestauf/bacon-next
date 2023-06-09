import type { Movie } from '@prisma/client';

import { prismaClient } from '../prismaClient';
import { tmdbClient } from './tmdbClient';


export const updateMovie = async (movie: Movie) => {
  const tmdbMovie = await tmdbClient.movies.getMovie(movie.id.toString());
  if (!tmdbMovie) return;
  await prismaClient.movie.update({
    where: { id: movie.id },
    include: { Cast: { include: { Actor: true } } },
    data: {
      title: tmdbMovie.title,
      overview: tmdbMovie.overview,
      poster_path: tmdbMovie.poster_path ? tmdbMovie.poster_path : '',
      release_date: tmdbMovie.release_date,
      adult: tmdbMovie.adult,
      backdrop_path: tmdbMovie.backdrop_path ? tmdbMovie.backdrop_path : '',
      original_language: tmdbMovie.original_language,
      original_title: tmdbMovie.original_title,
      popularity: tmdbMovie.popularity,
      vote_average: tmdbMovie.vote_average,
      vote_count: tmdbMovie.vote_count,
    },
  });

  await Promise.all(
    tmdbMovie.credits.map(async (actorData) => {
      const actor = await prismaClient.actor.upsert({
        where: { id: actorData.id },
        create: {
          id: actorData.id,
          name: actorData.name,
          adult: actorData.adult,
          known_for_department: actorData.known_for_department,
          popularity: actorData.popularity,
          profile_path: actorData.profile_path ? actorData.profile_path : '',
        },
        update: {
          name: actorData.name,
        },
      });
      await prismaClient.cast.upsert({
        where: {
          movieId_actorId: {
            actorId: actor.id,
            movieId: movie.id,
          },
        },
        create: {
          character: actorData.character,
          id: actorData.credit_id,
          Actor: {
            connect: {
              id: actor.id,
            },
          },
          Movie: {
            connect: {
              id: movie.id,
            },
          },
        },
        update: {},
      });
    }),
  );
};

export const movieRefresh = async (tmdbId: string) => {
  console.log('movieRefresh', tmdbId);
  const movie = await prismaClient.movie.findUnique({
    where: { id: Number(tmdbId) },
  });
  if (movie) {
    await updateMovie(movie);
  }
};
