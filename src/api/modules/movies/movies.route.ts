import { NextFunction, Request, Response, Router } from 'express';
import { uploadImageMiddelware } from '../../../shared/uploadImageMulter';
import { verifyUserIsAuthenticated } from '../auth/middelwares/VerifyUserIsAuthenticated';
import { findMovieDetailsControllers } from './controllers/findMovieDetailsController';
import { findMoviesAllController } from './controllers/findMoviesAllController';
import { MovieDeleterController } from './controllers/MovieDeleteController';
import { MoviePostController } from './controllers/MoviePostController';
import { MovieUpdateController } from './controllers/MovieUpdateController';
import { MoviesCrudService } from './services/MoviesCrud';

export function registerRouterMovies(): Router {
  const routersMovies = Router();
  routersMovies.use((req: Request, res: Response, next: NextFunction) => verifyUserIsAuthenticated(req, res, next));

  const crudService = new MoviesCrudService();

  routersMovies.get('/movies', (req: Request, res: Response) => findMoviesAllController(req, res));

  routersMovies.get('/movies/:id', (req: Request, res: Response) => findMovieDetailsControllers(req, res));

  const moviePostController = new MoviePostController(crudService);
  routersMovies.post('/movies', uploadImageMiddelware.single('image'), (req: Request, res: Response) =>
    moviePostController.run(req, res)
  );

  const movieUpdaterController = new MovieUpdateController(crudService);
  routersMovies.patch('/movies/:id', uploadImageMiddelware.single('image'), (req: Request, res: Response) =>
    movieUpdaterController.run(req, res)
  );

  const movieDeleterController = new MovieDeleterController(crudService);
  routersMovies.delete('/movies/:id', (req: Request, res: Response) => movieDeleterController.run(req, res));

  return routersMovies;
}
