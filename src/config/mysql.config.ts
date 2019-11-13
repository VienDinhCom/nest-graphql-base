import utils from '../utils';
import { ConnectionOptions } from 'typeorm';

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
} = utils.env.getAll();

export const mysqlConfig: ConnectionOptions = {
  type: 'mysql',
  host: MYSQL_HOST,
  port: parseInt(MYSQL_PORT, 10),
  username: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
};
