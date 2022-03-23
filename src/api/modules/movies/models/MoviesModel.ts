import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';
import { GENRE_TABLE_NAME } from '../../genres/models/GenresModel';

export const MOVIE_TABLE_NAME = 'movies';

export class Movie extends Model<InferAttributes<Movie>, InferCreationAttributes<Movie>> {
  declare id: string;
  declare title: string;
  declare imageUrl: string;
  declare qualification: number;
  declare createdAt: CreationOptional<Date>;
  declare genreId: string;

  static associate(sequelize: Sequelize) {
    const { Character, MoviesCharactersRelation, Genre } = sequelize.models;
    this.belongsToMany(Character, {
      as: 'characters',
      through: MoviesCharactersRelation,
      foreignKey: 'movieId',
      otherKey: 'characterId'
    });
    this.belongsTo(Genre, { as: 'genre' });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      modelName: 'Movie',
      tableName: MOVIE_TABLE_NAME
    };
  }
}

export const MovieSchema = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true
  },
  title: {
    type: DataTypes.STRING
  },
  imageUrl: {
    field: 'image_url',
    type: DataTypes.STRING
  },
  qualification: {
    type: DataTypes.INTEGER,
    validate: {
      isIn: [[1, 2, 3, 4, 5]] // check the value is one of these
    }
  },
  genreId: {
    field: 'genre_id',
    type: DataTypes.STRING,
    references: {
      model: GENRE_TABLE_NAME,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },

  createdAt: DataTypes.DATE
};
