import { ConnectionOptions } from 'typeorm';

export const sqliteConfig: ConnectionOptions = {
  type: 'sqlite',
  database: __dirname + 'database.sqlite',
};
