import { Request, Response, Router } from 'express';
import { UserFinderByIdGetController } from './controllers/UserFinderByIdGetController';
import { UserPostController } from './controllers/UserPostController';
import { UserCreator } from './services/UserCreator';
import { UserFinderById } from './services/UserFinderById';

export function registerRouterUser(): Router {
  const routersUser = Router();

  const userCreator = new UserCreator();
  const userPostController = new UserPostController(userCreator);
  routersUser.post('/users', (req: Request, res: Response) => userPostController.run(req, res));

  const userFinderById = new UserFinderById();
  const userfinderController = new UserFinderByIdGetController(userFinderById);
  routersUser.get('/users/:id', (req: Request, res: Response) => userfinderController.run(req, res));

  return routersUser;
}
