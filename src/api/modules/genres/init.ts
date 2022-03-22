import { Application } from 'express';
import { registerRouterGenres } from './genres.route';

export function initRouterGenres(app: Application) {
  app.use('/api', registerRouterGenres());
}
