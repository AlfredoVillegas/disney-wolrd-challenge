import { Application } from 'express';
import { registerRouterUser } from './users.route';

export function initRouterUsers(app: Application) {
  app.use('/api', registerRouterUser());
}
