import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from 'sequelize';

export const CHARACTER_TABLE_NAME = 'characters';

export class Character extends Model<InferAttributes<Character>, InferCreationAttributes<Character>> {
  declare id: string;
  declare name: string;
  declare imageUrl: string;
  declare age: number;
  declare weight: number;
  declare history: string;

  declare createdAt: CreationOptional<Date>;

  static associate(sequelize: Sequelize) {
    const { Movie, MoviesCharactersRelation } = sequelize.models;

    this.belongsToMany(Movie, {
      as: 'movies',
      through: MoviesCharactersRelation,
      foreignKey: 'characterId',
      otherKey: 'movieId'
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: CHARACTER_TABLE_NAME,
      modelName: 'Character'
    };
  }
}

export const CharacterSchema = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    field: 'image_url',
    type: DataTypes.STRING
  },
  age: {
    type: DataTypes.INTEGER
  },
  weight: {
    type: DataTypes.INTEGER
  },
  history: {
    type: DataTypes.TEXT
  },

  createdAt: DataTypes.DATE
};
