
// eslint-disable-next-line @typescript-eslint/no-var-requires
import pg from 'pg';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('postgresql://neondb_owner:VGka30otnAeg@ep-small-fire-a8dncw60.eastus2.azure.neon.tech/neondb?sslmode=require', {
  dialect: 'postgres',
  dialectModule: pg
});