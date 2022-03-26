import { Request, Response, Router } from 'express';
import { validateReqSchema } from '../../../shared/network/validateReqSchema';
import { uploadImageMiddelware } from '../../../shared/uploadImageMulter';
import { findMovieDetailsControllers } from './controllers/findMovieDetailsController';
import { findMoviesAllController } from './controllers/findMoviesAllController';
import { MovieDeleterController } from './controllers/MovieDeleteController';
import { MoviePostController } from './controllers/MoviePostController';
import { MovieUpdateController } from './controllers/MovieUpdateController';
import { reqCreateMovieSchema, reqFindAllMoviesSchema, reqUpdateMovieSchema } from './models/reqSchemaValidations';
import { MoviesCrudService } from './services/MoviesCrud';

export function registerRouterMovies(): Router {
  const routersMovies = Router();
  //routersMovies.use(verifyUserIsAuthenticated); //req, res, next));

  const crudService = new MoviesCrudService();

  routersMovies.get('/movies', validateReqSchema(reqFindAllMoviesSchema), (req: Request, res: Response) =>
    findMoviesAllController(req, res)
  );

  routersMovies.get('/movies/:id', (req: Request, res: Response) => findMovieDetailsControllers(req, res));

  const moviePostController = new MoviePostController(crudService);
  routersMovies.post(
    '/movies',
    validateReqSchema(reqCreateMovieSchema),
    uploadImageMiddelware.single('image'),
    (req: Request, res: Response) => moviePostController.run(req, res)
  );

  const movieUpdaterController = new MovieUpdateController(crudService);
  routersMovies.patch(
    '/movies/:id',
    validateReqSchema(reqUpdateMovieSchema),
    uploadImageMiddelware.single('image'),
    (req: Request, res: Response) => movieUpdaterController.run(req, res)
  );

  const movieDeleterController = new MovieDeleterController(crudService);
  routersMovies.delete('/movies/:id', (req: Request, res: Response) => movieDeleterController.run(req, res));

  return routersMovies;
}
