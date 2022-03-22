import { Request, Response } from 'express';
import { GenreNotExist } from '../Errors';
import { GenresCrudService } from '../services/GenresCrud';

export class GenreByIdController {
  constructor(private crudService: GenresCrudService) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const genre = await this.crudService.findOneById(id);
      res.status(200).json({ data: genre });
    } catch (err: any) {
      if (err instanceof GenreNotExist) {
        res.status(404).json({ errorMessage: err.message });
      } else {
        res.status(500).json({ errorMessage: 'server error' });
      }
    }
  }
}
