import { Op, where } from 'sequelize';
import { dbConnectionSequelize } from '../../../../db/dbConnection';

const { Character, Movie } = dbConnectionSequelize.models;

// buscar por nombre, y filtrar por edad, peso o películas/series

export async function findCharactersAll(filter?: { name?: string; age?: number; weigth?: number; movieId?: string }) {
  const options = buildOptions(filter);

  const characters = await Character.findAll(options);

  console.log(characters);
  return characters;
}

function buildOptions(filter: any = {}) {
  const options = {
    attributes: ['name', 'imageUrl'],
    where: {},
    include: [
      'moviesLinked'
      /*{
        //model: Movie,
        as: 'moviesLinked'
        //attributes: ['id']
        through: {
          where: {
            movieId: 'mo'
          }
        }
      }*/
    ]
  };

  if (filter.name) {
    options.where = { ...options.where, name: { [Op.like]: `%${filter.name}%` } };
  }

  options.where = filter.age ? { ...options.where, age: filter.age } : options.where;

  options.where = filter.weigth ? { ...options.where, weigth: filter.weigth } : options.where;

  //options.where = filter.movieId ? { ...options.where, moviesLinked: filter.movieId } : options.where;

  return options;
}
