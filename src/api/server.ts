import cors from 'cors';
import express, { Application } from 'express';
import { initRouterAuth } from './modules/auth/init';
import { initRouterCharacter } from './modules/characters/init';
import { initRouterGenres } from './modules/genres/init';
import { initRouterMovies } from './modules/movies/init';
import { initRouterUsers } from './modules/users/init';

export class Server {
  private app: Application;
  private port: string;
  private host: string;
  readonly apiPath = '/api';

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';
    this.host = process.env.HOST || 'http://localhost';

    this.middlewares();
    this.initRoutes();
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use('/public', express.static(`public`));
  }

  initRoutes() {
    initRouterAuth(this.app);
    initRouterUsers(this.app);
    initRouterCharacter(this.app);
    initRouterGenres(this.app);
    initRouterMovies(this.app);
  }

  async listen() {
    this.app.listen(this.port, () => {
      console.log(` App is running at ${this.host}:${this.port}${this.apiPath} `);
      console.log(' Press CTRL-C to stop\n');
    });
  }
}
