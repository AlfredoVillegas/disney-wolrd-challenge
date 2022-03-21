import { config } from 'dotenv';
import { dbConnectionSequelize } from '../db/dbConnection';
import { Server } from './server';

config();

(async () => {
  try {
    await dbConnectionSequelize.authenticate();
    //await dbConnectionSequelize.sync({ force: true });
    console.log('Connection has been established successfully.');
  } catch (error) {
    return console.error('Unable to connect to the database:', error);
  }

  try {
    console.log('Init Api Server...');
    console.log(process.env.PORT);
    const server = new Server();
    await server.listen();
  } catch (error) {
    console.error('Unable to init server:', error);
  }
})();
