import { Request, Response, Router } from 'express';
import { CharacterDeleterController } from './controllers/CharacterDeleterController';
import { CharacterPostController } from './controllers/CharacterPostController';
import { CharacterUpdateController } from './controllers/CharacterUpdateControllers';
import { findCharactersAllControllers } from './controllers/findCharacterAllControllers';
import { FindCharacterDetailControllers } from './controllers/FindCharacterDetailControllers';
import { CharactersCrudService } from './services/CharactersCrud';

export function registerRouterCharacter(): Router {
  const routersUser = Router();
  const crudService = new CharactersCrudService();

  routersUser.get('/characters', (req: Request, res: Response) => findCharactersAllControllers(req, res));

  routersUser.get('/characters/:id', (req: Request, res: Response) => FindCharacterDetailControllers(req, res));

  const characterPostController = new CharacterPostController(crudService);
  routersUser.post('/characters', (req: Request, res: Response) => characterPostController.run(req, res));

  const characterUpdaterController = new CharacterUpdateController(crudService);
  routersUser.patch('/characters/:id', (req: Request, res: Response) => characterUpdaterController.run(req, res));

  const characterDeleterController = new CharacterDeleterController(crudService);
  routersUser.delete('/characters/:id', (req: Request, res: Response) => characterDeleterController.run(req, res));

  return routersUser;
}
