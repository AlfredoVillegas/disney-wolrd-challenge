import { NextFunction, Request, Response, Router } from 'express';
import { validateReqSchema } from '../../../shared/network/validateReqSchema';
import { uploadImageMiddelware } from '../../../shared/uploadImageMulter';
import { verifyUserIsAuthenticated } from '../auth/middelwares/VerifyUserIsAuthenticated';
import { GenreByIdController } from './controllers/GenreByIdControler';
import { GenreDeleterController } from './controllers/GenresDeleteController';
import { GenresPostController } from './controllers/GenresPostController';
import { reqCreateGenreSchema } from './models/reqSchemaValidations';
import { GenresCrudService } from './services/GenresCrud';

export function registerRouterGenres(): Router {
  const genresRouter = Router();
  genresRouter.use((req: Request, res: Response, next: NextFunction) => verifyUserIsAuthenticated(req, res, next));

  const crudService = new GenresCrudService();

  const genreByIdController = new GenreByIdController(crudService);
  genresRouter.get('/genres/:id', (req: Request, res: Response) => genreByIdController.run(req, res));

  const genrePostController = new GenresPostController(crudService);
  genresRouter.post(
    '/genres',
    validateReqSchema(reqCreateGenreSchema),
    uploadImageMiddelware.single('image'),
    (req: Request, res: Response) => genrePostController.run(req, res)
  );

  const genresDeleterController = new GenreDeleterController(crudService);
  genresRouter.delete('/genres/:id', (req: Request, res: Response) => genresDeleterController.run(req, res));

  return genresRouter;
}
