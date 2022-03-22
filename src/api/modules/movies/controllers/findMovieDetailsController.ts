import { Request, Response } from 'express';
import { findMovieDetailsService } from '../services/findMovieDetails';

export async function findMovieDetailsControllers(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const movie = await findMovieDetailsService(id);
    res.status(200).json({ data: movie });
  } catch (err: any) {
    res.status(400).json({ errorMessage: err.message });
  }
}
