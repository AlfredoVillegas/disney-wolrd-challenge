import { Request, Response } from 'express';
import { responseSuccess } from '../../../../shared/network/response';
import { findMoviesAllService } from '../services/findMoviesAllService';

export async function findMoviesAllController(req: Request, res: Response) {
  try {
    const { name, genre, order } = req.query as any;
    const movies = await findMoviesAllService({ title: name, genreId: genre, order });

    responseSuccess(res, 200, movies);
  } catch (err: any) {
    res.status(400).json({ errorMessage: err.message });
  }
}
