import { dbConnectionSequelize } from '../../../../db/dbConnection';
import { Movie } from '../../movies/models/MoviesModel';
import { CharacterNotExist } from '../Errors';

const { Character } = dbConnectionSequelize.models;

export async function findCharacterDetails(id: string) {
  const character = await Character.findByPk(id, {
    include: [{ model: Movie, as: 'movies', through: { attributes: [] } }]
  });
  if (!character) {
    throw new CharacterNotExist(id);
  }
  return character;
}
