import { Request, Response } from 'express';
import { responseError, responseSuccess } from '../../../../shared/network/response';
import { GenreNotExist } from '../Errors';
import { GenresCrudService } from '../services/GenresCrud';

export class GenreByIdController {
  constructor(private crudService: GenresCrudService) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const genre = await this.crudService.findOneById(id);
      responseSuccess(res, 200, genre);
    } catch (err: any) {
      if (err instanceof GenreNotExist) {
        responseError(res, 404, err.message);
      } else {
        responseError(res);
      }
    }
  }
}
