import { Request, Response } from 'express';
import { GenresCrudService } from '../services/GenresCrud';

export class GenresPostController {
  constructor(private genresCrud: GenresCrudService) {}
  async run(req: Request, res: Response) {
    try {
      const { id, name, imageUrl } = req.body;
      await this.genresCrud.create({ id, name, imageUrl });
      res.status(201).send();
    } catch (err: any) {
      res.status(500).json({ errorMessage: err.message });
    }
  }
}
