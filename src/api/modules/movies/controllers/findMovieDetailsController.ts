import { Request, Response } from 'express';
import { responseSuccess } from '../../../../shared/network/response';
import { findMovieDetailsService } from '../services/findMovieDetails';

export async function findMovieDetailsControllers(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const movie = await findMovieDetailsService(id);
    responseSuccess(res, 200, movie);
  } catch (err: any) {
    res.status(400).json({ errorMessage: err.message });
  }
}
