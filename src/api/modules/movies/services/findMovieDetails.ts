import { dbConnectionSequelize } from '../../../../db/dbConnection';
import { Character } from '../../characters/models/CharactersModel';
import { MovieNotExist } from '../Errors';

const { Movie } = dbConnectionSequelize.models;

export async function findMovieDetailsService(id: string) {
  const movie = await Movie.findByPk(id, {
    include: [{ model: Character, as: 'characters', through: { attributes: [] } }]
  });
  if (!movie) {
    throw new MovieNotExist(id);
  }
  return movie;
}
//[{ model: Movie, as: 'movies', through: { attributes: [] } }];
