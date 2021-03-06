import { dbConnectionSequelize } from '../../../../db/dbConnection';
import { CharacterNotExist } from '../Errors';

const { Character } = dbConnectionSequelize.models;

export class CharactersCrudService {
  async findOneById(id: string) {
    const character = await Character.findByPk(id);
    if (!character) {
      throw new CharacterNotExist(id);
    }
    return character;
  }

  async create(dataCharacter: {
    id: string;
    name: string;
    imageUr?: string;
    age: number;
    weight: number;
    history: string;
    movies?: string[];
  }) {
    const character: any = await Character.create(dataCharacter);
    await character.addMovies(dataCharacter.movies);
    return character;
  }

  async delete(id: string) {
    const character = await this.findOneById(id);
    return await character.destroy();
  }

  async update(
    id: string,
    dataChanges: {
      name?: string;
      imageUrl?: string;
      age?: number;
      weight?: number;
      history?: string;
      movies?: string[];
    }
  ) {
    const character: any = await this.findOneById(id);

    await character.addMovies(dataChanges.movies);

    return await character.update(dataChanges);
  }
}
