import { Request, Response } from 'express';
import { MovieNotExist } from '../Errors';
import { MoviesCrudService } from '../services/MoviesCrud';

export class MovieUpdateController {
  constructor(private crudService: MoviesCrudService) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const body = req.body;
      await this.crudService.update(id, body);

      res.status(201).send();
    } catch (err: any) {
      if (err instanceof MovieNotExist) {
        res.status(404).json({ errorMessage: err.message });
      } else {
        res.status(500).json({ errorMessage: 'server error' });
      }
    }
  }
}
