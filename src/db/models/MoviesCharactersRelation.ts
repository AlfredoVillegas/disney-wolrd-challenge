import { DataTypes, Model, Sequelize } from 'sequelize';
import { CHARACTER_TABLE_NAME } from '../../api/modules/characters/models/CharactersModel';

import { MOVIE_TABLE_NAME } from '../../api/modules/movies/models/MoviesModel';

export const MOVIE_CHARACTER_TABLE = 'movies_characters_relation';

export class MoviesCharactersRelation extends Model {
  //static associate() {}
  declare movieId: string;
  declare characterId: string;

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: MOVIE_CHARACTER_TABLE,
      modelName: 'MoviesCharactersRelation'
    };
  }
}

export const MoviesCharactersRelationSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at'
  },

  movieId: {
    field: 'movie_id',
    allowNull: false,
    type: DataTypes.STRING,
    references: {
      model: MOVIE_TABLE_NAME,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  characterId: {
    field: 'character_id',
    allowNull: false,
    type: DataTypes.STRING,
    references: {
      model: CHARACTER_TABLE_NAME,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
};
