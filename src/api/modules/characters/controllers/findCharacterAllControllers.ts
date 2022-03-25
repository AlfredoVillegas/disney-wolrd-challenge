import { Request, Response } from 'express';
import { responseError, responseSuccess } from '../../../../shared/network/response';
import { findCharactersAll } from '../services/CharactersFinderAll';

/*
interface queryTypes {
  name: string;
  age: number;
  movieId: string;
}
*/
export async function findCharactersAllControllers(req: Request, res: Response) {
  try {
    const { name, age, weigth, movie } = req.query as any;
    const characters = await findCharactersAll({ name, age, weigth, movieId: movie });
    responseSuccess(res, 200, characters);
  } catch (err: any) {
    responseError(res, 500, err.message);
  }
}
