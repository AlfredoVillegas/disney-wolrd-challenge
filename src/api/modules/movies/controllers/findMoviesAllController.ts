import { Request, Response } from 'express';
import { findMoviesAllService } from '../services/findMoviesAllService';

export async function findMoviesAllController(req: Request, res: Response) {
  const { name, genre, order } = req.query as any;

  const movies = await findMoviesAllService({ title: name, genreId: genre, order });

  res.status(200).json({ data: movies });
}

/* try {
      const { name, age, weigth, movieId } = req.query as any;
  
      const characters = await findCharactersAll({ name, age, weigth, movieId });
      res.status(200).json({ data: characters });
    } catch (err: any) {
      res.status(400).json({ errorMessage: err.message });
    } */
