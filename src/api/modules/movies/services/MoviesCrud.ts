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

  async create(dataMovie: {
    id: string;
    title: string;
    imageUrl: string;
    qualification: number;
    genreId: string;
    charactersId?: string[];
  }) {
    console.log(dataMovie);
    const movie: any = await Movie.create(dataMovie);
    await movie.addCharacters(dataMovie.charactersId);
    return movie;
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
      charactersId?: string[];
    }
  ) {
    const movie: any = await this.findOneById(id);
    await movie.addCharacters(dataChanges.charactersId);
    return await movie.update(dataChanges);
  }
}
