import { Sequelize } from 'sequelize';
import { applyExtraSetup } from './index-models';

const dbConnectionSequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './disney.sql'
});

applyExtraSetup(dbConnectionSequelize);

export { dbConnectionSequelize };
