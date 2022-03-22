import { dbConnectionSequelize } from '../../../../db/dbConnection';
import { GenreNotExist } from '../Errors';

const { Genre } = dbConnectionSequelize.models;

export class GenresCrudService {
  async findOneById(id: string) {
    const genre = await Genre.findByPk(id);
    if (!genre) {
      throw new GenreNotExist(id);
    }
    return genre;
  }

  async create(dataCharacter: { id: string; name: string; imageUrl: string }) {
    return await Genre.create(dataCharacter);
  }

  async delete(id: string) {
    const genre = await this.findOneById(id);
    return await genre.destroy();
  }

  async update(id: string, dataChanges: { name?: string; imageUrl?: string }) {
    const genre = await this.findOneById(id);
    return await genre.update(dataChanges);
  }
}
