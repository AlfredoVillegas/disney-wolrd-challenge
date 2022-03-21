import { Request, Response } from 'express';
import { CharacterNotExist } from '../Errors';
import { CharactersCrudService } from '../services/CharactersCrud';

export class CharacterUpdateController {
  constructor(private crudService: CharactersCrudService) {}

  async run(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const body = req.body;
      await this.crudService.update(id, body);

      res.status(201).send();
    } catch (err: any) {
      if (err instanceof CharacterNotExist) {
        res.status(404).json({ errorMessage: err.message });
      } else {
        res.status(500).json({ errorMessage: 'server error' });
      }
    }
  }
}
