import { Request, Response } from 'express';
import { responseError, responseSuccess } from '../../../../shared/network/response';
import { CharactersCrudService } from '../services/CharactersCrud';

export class CharacterPostController {
  constructor(private crudService: CharactersCrudService) {}

  async run(req: Request, res: Response) {
    try {
      const body = req.body;
      body.imageUrl = req.body.filePath;
      await this.crudService.create(body);
      responseSuccess(res, 201);
    } catch (err: any) {
      responseError(res, 500, err.message);
    }
  }
}
