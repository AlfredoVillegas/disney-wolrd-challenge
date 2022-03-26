import { body, query } from 'express-validator';

export const reqCreateUserSchema = [
  body('id').exists().isString(),
  body('name').exists().isString(),
  body('history').optional().isString(),
  body('weight').optional().isNumeric(),
  body('age').optional().isNumeric(),
  body('imageUrl').optional().isString(),
  body('movies').optional().isArray()
];

export const reqUpdateCharacterSchema = [
  query('id').exists().isString(),
  body('name').optional().isString(),
  body('history').optional().isString(),
  body('weight').optional().isNumeric(),
  body('age').optional().isNumeric(),
  body('imageUrl').optional().isString(),
  body('movies').optional().isArray()
];

export const reqFindCharactersAllSchema = [
  query('name').optional().isString(),
  query('age').optional().isNumeric(),
  query('weigth').optional().isNumeric(),
  query('movie').optional().isString()
];
