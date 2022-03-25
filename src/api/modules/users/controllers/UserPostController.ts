import { Request, Response } from 'express';
import { responseSuccess } from '../../../../shared/network/response';
import { UserCreator } from '../services/UserCreator';

export class UserPostController {
  constructor(private createUserService: UserCreator) {}

  public async run(req: Request, res: Response) {
    try {
      const { id, email, name, password } = req.body;
      await this.createUserService.execute(id, email, name, password);
      responseSuccess(res, 201);
    } catch (err: any) {
      res.status(500).json({ errorMessage: err.message });
    }
  }
}
