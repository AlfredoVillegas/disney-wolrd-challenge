import { Request, Response } from 'express';
import { MovieNotExist } from '../Errors';
import { MoviesCrudService } from '../services/MoviesCrud';

export class MovieDeleterController {
  constructor(private crudService: MoviesCrudService) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.crudService.delete(id);
      res.status(200).send();
    } catch (err: any) {
      if (err instanceof MovieNotExist) {
        res.status(404).json({ errorMessage: err.message });
      } else {
        res.status(500).json({ errorMessage: 'server error' });
      }
    }
  }
}
