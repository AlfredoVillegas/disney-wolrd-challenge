import { Request, Response } from 'express';
import { UserFinderById } from '../services/UserFinderById';

export class UserFinderByIdGetController {
  constructor(private finderService: UserFinderById) {}

  public async run(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.finderService.execute(id);
      res.status(200).json({ data: user });
    } catch (err: any) {
      res.status(404).json({ errorMessage: err.message });
    }
  }
}
