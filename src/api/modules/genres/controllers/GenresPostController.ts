import { Request, Response } from 'express';
import { responseSuccess } from '../../../../shared/network/response';

import { GenresCrudService } from '../services/GenresCrud';

export class GenresPostController {
  constructor(private genresCrud: GenresCrudService) {}
  async run(req: Request, res: Response) {
    try {
      const { id, name, filePath } = req.body;
      //const imageUrl = req.file?.path;
      await this.genresCrud.create({ id, name, imageUrl: filePath });
      responseSuccess(res, 201);
    } catch (err: any) {
      res.status(500).json({ errorMessage: err.message });
    }
  }
}
