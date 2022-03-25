import { Request, Response } from 'express';
import { responseError, responseSuccess } from '../../../../shared/network/response';
import { CharacterNotExist } from '../Errors';
import { CharactersCrudService } from '../services/CharactersCrud';

export class CharacterDeleterController {
  constructor(private crudService: CharactersCrudService) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.crudService.delete(id);
      responseSuccess(res);
    } catch (err) {
      if (err instanceof CharacterNotExist) {
        responseError(res, 404, err.message);
      } else {
        responseError(res);
      }
    }
  }
}
