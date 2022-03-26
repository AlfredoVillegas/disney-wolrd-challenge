import { NextFunction, Request, Response, Router } from 'express';
import { validateReqSchema } from '../../../shared/network/validateReqSchema';
import { uploadImageMiddelware } from '../../../shared/uploadImageMulter';
import { verifyUserIsAuthenticated } from '../auth/middelwares/VerifyUserIsAuthenticated';
import { CharacterDeleterController } from './controllers/CharacterDeleterController';
import { CharacterPostController } from './controllers/CharacterPostController';
import { CharacterUpdateController } from './controllers/CharacterUpdateControllers';
import { findCharactersAllControllers } from './controllers/findCharacterAllControllers';
import { FindCharacterDetailControllers } from './controllers/FindCharacterDetailControllers';
import {
  reqCreateUserSchema,
  reqFindCharactersAllSchema,
  reqUpdateCharacterSchema
} from './models/reqSchemaValidations';
import { CharactersCrudService } from './services/CharactersCrud';

export function registerRouterCharacter(): Router {
  const routersCharacters = Router();
  //Route
  routersCharacters.use((req: Request, res: Response, next: NextFunction) => verifyUserIsAuthenticated(req, res, next));

  const crudService = new CharactersCrudService();

  routersCharacters.get('/characters', validateReqSchema(reqFindCharactersAllSchema), (req: Request, res: Response) =>
    findCharactersAllControllers(req, res)
  );

  routersCharacters.get('/characters/:id', (req: Request, res: Response) => FindCharacterDetailControllers(req, res));

  const characterPostController = new CharacterPostController(crudService);
  routersCharacters.post(
    '/characters',
    validateReqSchema(reqCreateUserSchema),
    uploadImageMiddelware.single('image'),
    (req: Request, res: Response) => characterPostController.run(req, res)
  );

  const characterUpdaterController = new CharacterUpdateController(crudService);
  routersCharacters.patch(
    '/characters/:id',
    validateReqSchema(reqUpdateCharacterSchema),
    uploadImageMiddelware.single('image'),
    (req: Request, res: Response) => characterUpdaterController.run(req, res)
  );

  const characterDeleterController = new CharacterDeleterController(crudService);
  routersCharacters.delete('/characters/:id', (req: Request, res: Response) =>
    characterDeleterController.run(req, res)
  );

  return routersCharacters;
}
