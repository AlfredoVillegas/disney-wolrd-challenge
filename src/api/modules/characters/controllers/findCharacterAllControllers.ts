import { Request, Response } from 'express';
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
    res.status(200).json({ data: characters });
  } catch (err: any) {
    res.status(400).json({ errorMessage: err.message });
  }
}
