import { dbConnectionSequelize } from '../../../../db/dbConnection';
import { MovieNotExist } from '../Errors';

const { Movie } = dbConnectionSequelize.models;

export async function findMovieDetailsService(id: string) {
  const movie = await Movie.findByPk(id, {
    include: 'characters'
  });
  if (!movie) {
    throw new MovieNotExist(id);
  }
  return movie;
}
