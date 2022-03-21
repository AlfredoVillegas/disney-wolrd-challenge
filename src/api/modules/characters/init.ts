import { Application } from 'express';
import { registerRouterCharacter } from './characters.route';

export function initRouterCharacter(app: Application) {
  app.use('/api', registerRouterCharacter());
}
