import { body, query } from 'express-validator';

export const reqCreateMovieSchema = [
  body('id').exists().isString(),
  body('title').exists().isString(),
  body('qualification').optional().isNumeric(),
  body('genreId').optional().isString(),
  body('charactersId').optional().isArray()
];

export const reqUpdateMovieSchema = [
  query('id').exists().isString(),
  body('title').optional().isString(),
  body('qualification').optional().isNumeric(),
  body('genreId').optional().isString(),
  body('charactersId').optional().isArray()
];

export const reqFindAllMoviesSchema = [
  query('name').optional().isString(),
  query('genre').optional().isString(),
  query('order').optional().isString()
];
