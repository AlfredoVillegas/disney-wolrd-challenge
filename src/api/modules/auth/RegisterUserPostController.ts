import { Request, Response } from 'express';
import { UserCreator } from '../users/services/UserCreator';

export class RegisterUserPostController {
  constructor(private createUserService: UserCreator) {}

  public async run(req: Request, res: Response) {
    try {
      const { id, email, name, password } = req.body;
      await this.createUserService.execute(id, email, name, password);
      res.status(201).send();
    } catch (err: any) {
      res.status(500).json({ errorMessage: err.message });
    }
  }
}
