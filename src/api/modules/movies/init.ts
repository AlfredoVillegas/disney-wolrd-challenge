import { Application } from 'express';
import { registerRouterMovies } from './movies.route';

export function initRouterMovies(app: Application) {
  app.use('/api', registerRouterMovies());
}
