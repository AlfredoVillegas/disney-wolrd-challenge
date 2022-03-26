import { Request, Response, Router } from 'express';
import { validateReqSchema } from '../../../shared/network/validateReqSchema';
import { reqCreateUserSchema } from '../users/models/reqSchemaValidations';
import { UserCreator } from '../users/services/UserCreator';
import { loginPostController } from './LoginPostController';
import { RegisterUserPostController } from './RegisterUserPostController';
import { reqLoginSchema } from './reqSchemaValidations';

export function registerAuthRouters(): Router {
  const routersAuth = Router();

  routersAuth.post('/auth/login', validateReqSchema(reqLoginSchema), (req: Request, res: Response) =>
    loginPostController(req, res)
  );

  const userCreator = new UserCreator();
  const userRegisterPostController = new RegisterUserPostController(userCreator);
  routersAuth.post('/auth/register', validateReqSchema(reqCreateUserSchema), (req: Request, res: Response) =>
    userRegisterPostController.run(req, res)
  );

  return routersAuth;
}
