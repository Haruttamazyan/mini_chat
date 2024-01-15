import * as dotenv from 'dotenv';

dotenv.config();

const getEnvKey = (key: string): string => {
  if (process.env[key] === undefined) {
    throw new Error(`Property "${key}" is missing in environment.`);
  }

  return process.env[key] as string;
};

export const NODE_ENV = getEnvKey('NODE_ENV');
export const APP_PORT = Number(getEnvKey('APP_PORT'));
