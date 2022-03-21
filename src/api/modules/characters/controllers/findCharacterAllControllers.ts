import { Request, Response } from 'express';
import { classicNameResolver } from 'typescript';
import { findCharactersAll } from '../services/CharactersFinderAll';
/*
interface queryTypes {
  name: string;
  age: number;
  movieId: string;
}
*/
export async function findCharactersAllControllers(req: Request, res: Response) {
  const { name, age, weigth, movieId } = req.query as any;

  const characters = await findCharactersAll({ name, age, weigth, movieId });
  res.status(200).json({ data: characters });
}

/* try {
    const { name, age, weigth, movieId } = req.query as any;

    const characters = await findCharactersAll({ name, age, weigth, movieId });
    res.status(200).json({ data: characters });
  } catch (err: any) {
    res.status(400).json({ errorMessage: err.message });
  } */
