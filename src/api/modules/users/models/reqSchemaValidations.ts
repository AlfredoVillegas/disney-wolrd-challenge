import { body } from 'express-validator';

export const reqCreateUserSchema = [
  body('id').exists().isString(),
  body('email').exists().isEmail(),
  body('name').exists().isString(),
  body('password').exists().isString()
];
