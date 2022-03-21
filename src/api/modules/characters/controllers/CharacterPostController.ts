import { Request, Response } from 'express';
import { CharactersCrudService } from '../services/CharactersCrud';

export class CharacterPostController {
  constructor(private crudService: CharactersCrudService) {}

  async run(req: Request, res: Response) {
    try {
      const body = req.body;
      await this.crudService.create(body);
      res.status(201).send();
    } catch (err: any) {
      res.status(400).json({ errorMessage: err.message });
    }
  }
}
