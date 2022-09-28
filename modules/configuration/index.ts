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

const initOutput = (props: {
    spaceKey: string;
    destination: string;
}): Output => {
    const { spaceKey, destination } = props;
    const siteOutput = path.resolve(destination, 'site', spaceKey);
    const output: Output = {
        home: siteOutput,
        assets: {
            avatars: path.resolve(siteOutput, 'assets', 'avatars')
        },
        attachments: path.resolve(siteOutput, 'attachments'),
        pages: path.resolve(siteOutput, 'notes'),
        blogs: path.resolve(siteOutput, 'articles'),
        objectResolver: path.resolve(siteOutput, 'object-resolver')
    };
    makeOutputDirectories(output);
    return output;
};

export { configuration, initOutput };
