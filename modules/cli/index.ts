#! /usr/bin/env ts-node

import { Command } from 'commander';
import * as path from 'path';
import { initOutput } from '../configuration';
import { extractSpace } from '../content-extractor';

const program = new Command();

program
    .command(`extract <spaceKey>`)
    .description(`extract all content and media from a confluence space`)
    .action(async (spaceKey: string) => {
        const destination = path.resolve(process.cwd(), 'output');
        const output = initOutput({ spaceKey, destination });
        await extractSpace(spaceKey, output);
    });

program.version(require('./package.json').version);
program.parse(process.argv);
