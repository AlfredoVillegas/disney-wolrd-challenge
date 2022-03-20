import { Sequelize } from 'sequelize/types';
import { Character, CharacterSchema } from '../api/modules/characters/models/CharactersModel';
import { Genre, GenreSchema } from '../api/modules/genres/models/GenresModel';
import { Movie, MovieSchema } from '../api/modules/movies/models/MoviesModel';
import { MoviesCharactersRelation, MoviesCharactersRelationSchema } from './models/MoviesCharactersRelation';

export function applyExtraSetup(sequelizeDb: Sequelize) {
  try {
    console.log('init');
    Genre.init(GenreSchema, Genre.config(sequelizeDb));
    Movie.init(MovieSchema, Movie.config(sequelizeDb));
    Character.init(CharacterSchema, Character.config(sequelizeDb));
    MoviesCharactersRelation.init(MoviesCharactersRelationSchema, MoviesCharactersRelation.config(sequelizeDb));

    console.log('/init');

    console.log('Relations');
    Genre.associate(sequelizeDb);
    Character.associate(sequelizeDb);
    Movie.associate(sequelizeDb);

    console.log('/Relations');
  } catch (error) {
    console.error('Unable to init models and relations:', error);
  }
}
