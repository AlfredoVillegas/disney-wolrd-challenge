import { dbConnectionSequelize } from '../../../../db/dbConnection';
import { MovieNotExist } from '../Errors';

const { Movie } = dbConnectionSequelize.models;

export class MoviesCrudService {
  async findOneById(id: string) {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      throw new MovieNotExist(id);
    }
    return movie;
  }

  async create(dataCharacter: { id: string; title: string; imageUrl: string; qualification: number; genreId: string }) {
    return await Movie.create(dataCharacter);
  }

  async delete(id: string) {
    const movie = await this.findOneById(id);
    return await movie.destroy();
  }

  async update(
    id: string,
    dataChanges: {
      title?: string;
      imageUrl?: string;
      qualification?: number;
      genre?: string;
    }
  ) {
    const genre = await this.findOneById(id);
    return await genre.update(dataChanges);
  }
}
