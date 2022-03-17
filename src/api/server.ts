import cors from 'cors';
import express, { Application } from 'express';
import { initRouterAuth } from './modules/auth/init';
import { initRouterUsers } from './modules/users/init';

export class Server {
  private app: Application;
  private port: string;
  readonly apiPath = '/api';

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';

    this.middlewares();
    this.initRoutes();
  }
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    //this.app.use(express.urlencoded({ extended: true }));
  }

  initRoutes() {
    initRouterAuth(this.app);
    initRouterUsers(this.app);
  }

  async listen() {
    this.app.listen(this.port, () => {
      console.log(` App is running at http://localhost:${this.port}${this.apiPath} `);
      console.log(' Press CTRL-C to stop\n');
    });
  }
}
