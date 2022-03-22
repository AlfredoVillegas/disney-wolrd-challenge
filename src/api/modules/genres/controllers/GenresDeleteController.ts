import { Request, Response } from 'express';
import { GenreNotExist } from '../Errors';
import { GenresCrudService } from '../services/GenresCrud';

export class GenreDeleterController {
  constructor(private crudService: GenresCrudService) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.crudService.delete(id);
      res.status(200).send();
    } catch (err: any) {
      if (err instanceof GenreNotExist) {
        res.status(404).json({ errorMessage: err.message });
      } else {
        res.status(500).json({ errorMessage: 'server error' });
      }
    }
  }
}
