import { body, query } from 'express-validator';

export const reqCreateGenreSchema = [body('id').exists().isString(), body('name').exists().isString()];

export const reqUdateGenreSchema = [
  query('id').exists().isString(),
  body('name').optional().isString(),
  body('imageUrl').optional().isString()
];
