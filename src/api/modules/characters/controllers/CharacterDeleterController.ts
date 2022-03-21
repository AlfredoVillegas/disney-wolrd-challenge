import { Request, Response } from 'express';
import { CharacterNotExist } from '../Errors';
import { CharactersCrudService } from '../services/CharactersCrud';

export class CharacterDeleterController {
  constructor(private crudService: CharactersCrudService) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.crudService.delete(id);
      res.status(200).send();
    } catch (err: any) {
      if (err instanceof CharacterNotExist) {
        res.status(404).json({ errorMessage: err.message });
      } else {
        res.status(500).json({ errorMessage: 'server error' });
      }
    }
  }
}
