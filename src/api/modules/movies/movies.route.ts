import { Request, Response, Router } from 'express';
import { findMovieDetailsControllers } from './controllers/findMovieDetailsController';
import { findMoviesAllController } from './controllers/findMoviesAllController';
import { MovieDeleterController } from './controllers/MovieDeleteController';
import { MoviePostController } from './controllers/MoviePostController';
import { MovieUpdateController } from './controllers/MovieUpdateController';
import { MoviesCrudService } from './services/MoviesCrud';

export function registerRouterMovies(): Router {
  const routersMovies = Router();
  const crudService = new MoviesCrudService();

  routersMovies.get('/movies', (req: Request, res: Response) => findMoviesAllController(req, res));

  routersMovies.get('/movies/:id', (req: Request, res: Response) => findMovieDetailsControllers(req, res));

  const moviePostController = new MoviePostController(crudService);
  routersMovies.post('/movies', (req: Request, res: Response) => moviePostController.run(req, res));

  const movieUpdaterController = new MovieUpdateController(crudService);
  routersMovies.patch('/movies/:id', (req: Request, res: Response) => movieUpdaterController.run(req, res));

  const movieDeleterController = new MovieDeleterController(crudService);
  routersMovies.delete('/movies/:id', (req: Request, res: Response) => movieDeleterController.run(req, res));

  return routersMovies;
}
