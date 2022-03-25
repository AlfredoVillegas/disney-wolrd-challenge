import { Request, Response } from 'express';
import { responseError, responseSuccess } from '../../../shared/network/response';
import { UserCreator } from '../users/services/UserCreator';

export class RegisterUserPostController {
  constructor(private createUserService: UserCreator) {}

  public async run(req: Request, res: Response) {
    try {
      const { id, email, name, password } = req.body;
      await this.createUserService.execute(id, email, name, password);
      responseSuccess(res, 201);
    } catch (err: any) {
      responseError(res, 500, err.mesagge);
    }
  }
}
