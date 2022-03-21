import { dbConnectionSequelize } from '../../../../db/dbConnection';
import { CharacterNotExist } from '../Errors';

const { Character } = dbConnectionSequelize.models;

export async function findCharacterDetails(id: string) {
  const character = await Character.findByPk(id, {
    include: 'moviesLinked'
  });
  if (!character) {
    throw new CharacterNotExist(id);
  }
  return character;
}
