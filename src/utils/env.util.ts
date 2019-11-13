import { config } from 'dotenv';

config();

export function get(variable: string) {
  return process.env[variable];
}

export function getAll() {
  return process.env;
}

export function isDev() {
  return !isProd();
}

export function isProd() {
  return get('NODE_ENV') === 'production';
}
