import { InferAttributes, InferCreationAttributes, Model, CreationOptional, DataTypes, Sequelize } from 'sequelize';

export const GENRE_TABLE_NAME = 'genres';

export class Genre extends Model<InferAttributes<Genre>, InferCreationAttributes<Genre>> {
  declare id: string;
  declare name: string;
  declare imageUrl: string;

  declare createdAt: CreationOptional<Date>;

  static associate(sequelize: Sequelize) {
    const { Movie } = sequelize.models;
    Genre.hasMany(Movie, {
      as: 'moviesLinked',
      foreignKey: 'genreId'
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      modelName: 'Genre',
      tableName: GENRE_TABLE_NAME
    };
  }
}

export const GenreSchema = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true
  },
  name: {
    type: DataTypes.STRING
  },
  imageUrl: {
    field: 'image_url',
    type: DataTypes.STRING
  },
  createdAt: DataTypes.DATE
};
