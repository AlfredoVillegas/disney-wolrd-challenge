import { Op } from 'sequelize';
import { dbConnectionSequelize } from '../../../../db/dbConnection';

const { Movie } = dbConnectionSequelize.models;

export async function findMoviesAllService(filters?: { title?: string; genreId?: string; order?: string }) {
  const options = buildOptions(filters);

  const movies = await Movie.findAll(options);

  return movies;
}

function buildOptions(filters: any = {}) {
  const options: any = {
    attributes: ['title', 'imageUrl', 'createdAt'],
    where: {},
    order: []
    //joinTableAttributes: []
    //include: ['characters']
  };

  if (filters.title) {
    options.where = { ...options.where, title: { [Op.like]: `%${filters.title}%` } };
  }

  options.where = filters.genreId ? { ...options.where, genreId: filters.genreId } : options.where;

  if (filters.order === 'ASC' || filters.order === 'DESC') {
    options.order.push(['createdAt', filters.order]);
  }

  return options;
}
