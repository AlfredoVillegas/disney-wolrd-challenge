import { body } from 'express-validator';

export const reqLoginSchema = [body('password').exists().isString(), body('email').exists().isEmail()];
