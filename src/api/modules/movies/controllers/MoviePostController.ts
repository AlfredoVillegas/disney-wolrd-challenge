import { Request, Response } from 'express';
import { responseSuccess } from '../../../../shared/network/response';
import { MoviesCrudService } from '../services/MoviesCrud';

export class MoviePostController {
  constructor(private crudService: MoviesCrudService) {}

  async run(req: Request, res: Response) {
    try {
      const body = req.body;
      body.imageUrl = req.body.filePath;
      await this.crudService.create(body);
      responseSuccess(res, 201);
    } catch (err: any) {
      res.status(400).json({ errorMessage: err.message });
    }
  }
}
