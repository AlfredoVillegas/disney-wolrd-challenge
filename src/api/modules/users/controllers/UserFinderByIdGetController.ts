import { Request, Response } from 'express';
import { responseSuccess } from '../../../../shared/network/response';
import { UserFinderById } from '../services/UserFinderById';

export class UserFinderByIdGetController {
  constructor(private finderService: UserFinderById) {}

  public async run(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.finderService.execute(id);
      responseSuccess(res, 200, user);
    } catch (err: any) {
      res.status(404).json({ errorMessage: err.message });
    }
  }
}
