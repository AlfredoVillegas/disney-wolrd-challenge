import { Op } from 'sequelize';
import { dbConnectionSequelize } from '../../../../db/dbConnection';
import { MovieNotExist } from '../../movies/Errors';

const { Character, Movie } = dbConnectionSequelize.models;

export async function findCharactersAll(filters: { name?: string; age?: number; weigth?: number; movieId?: string }) {
  const options = buildOptions(filters);

  if (filters && filters.movieId) {
    const movie: any = await Movie.findByPk(filters.movieId);
    if (!movie) throw new MovieNotExist(filters.movieId);

    return await movie.getCharacters(options);
  }

  return await Character.findAll(options);
}

function buildOptions(filters: any = {}) {
  const options = {
    attributes: ['name', 'imageUrl'],
    where: {},
    joinTableAttributes: []
  };

  if (filters.name) {
    options.where = { ...options.where, name: { [Op.like]: `%${filters.name}%` } };
  }
  options.where = filters.age ? { ...options.where, age: filters.age } : options.where;
  options.where = filters.weigth ? { ...options.where, weigth: filters.weigth } : options.where;

  //console.log(options);
  return options;
}
