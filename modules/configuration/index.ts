import dotenv from 'dotenv';
import { Configuration } from './types';

const parsedConfig: unknown = dotenv.config().parsed;
const configuration = parsedConfig as Configuration;

export { configuration };
