import { Request, Response } from 'express';
import { responseError, responseSuccess } from '../../../../shared/network/response';
import { CharacterNotExist } from '../Errors';
import { CharactersCrudService } from '../services/CharactersCrud';

export class CharacterUpdateController {
  constructor(private crudService: CharactersCrudService) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const body = req.body;
      body.imageUrl = req.body.filePath;

      await this.crudService.update(id, body);
      responseSuccess(res, 201);
    } catch (err) {
      if (err instanceof CharacterNotExist) {
        responseError(res, 404, err.message);
        res.status(404).json({ errorMessage: err.message });
      } else {
        responseError(res);
      }
    }
  }
}
