import dotenv from 'dotenv';
import { Configuration, Output } from './types';
import * as path from 'path';
import * as fs from 'fs';

const parsedConfig: unknown = dotenv.config().parsed;
const configuration = parsedConfig as Configuration;

const makeOutputDirectories = (data: any) => {
    for (const dir of Object.values(data)) {
        if (typeof dir === 'string') fs.mkdirSync(dir, { recursive: true });
        else makeOutputDirectories(dir);
    }
};

const initOutput = (destination: string): Output => {
    const siteOutput = path.resolve(destination, 'site');
    const output: Output = {
        home: siteOutput,
        pages: path.resolve(siteOutput, 'notes'),
        blogs: path.resolve(siteOutput, 'articles')
    };
    makeOutputDirectories(output);
    return output;
};

export { configuration, initOutput };
