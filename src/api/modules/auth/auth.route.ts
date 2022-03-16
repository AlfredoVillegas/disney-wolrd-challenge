import { Request, Response, Router } from 'express';
import { UserCreator } from '../users/services/UserCreator';
import { loginPostController } from './LoginPostController';
import { RegisterUserPostController } from './RegisterUserPostController';

export function registerAuthRouters(): Router {
  const routersAuth = Router();

  routersAuth.post('/auth/login', (req: Request, res: Response) => loginPostController(req, res));

  const userCreator = new UserCreator();
  const userRegisterPostController = new RegisterUserPostController(userCreator);
  routersAuth.post('/auth/register', (req: Request, res: Response) => userRegisterPostController.run(req, res));

  return routersAuth;
}
