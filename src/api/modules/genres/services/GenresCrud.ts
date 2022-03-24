import { GenreNotExist } from '../Errors';
import { Genre } from '../models/GenresModel';

//const { Genre } = dbConnectionSequelize.models;

export class GenresCrudService {
  async findOneById(id: string) {
    const genre = await Genre.findByPk(id);
    if (!genre) {
      throw new GenreNotExist(id);
    }
    return genre;
  }

  async create(dataGenre: { id: string; name: string; imageUrl?: string }) {
    const genre = Genre.create(dataGenre);
    return genre;
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
