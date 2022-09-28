#! /usr/bin/env node

import { Command } from 'commander';
import * as path from 'path';
import { initOutput } from '../configuration';
import { extractBlogs, extractSpace } from '../content-extractor';

const program = new Command();

program
    .command(`extract <spaceKey>`)
    .description(`extract all content and media from a confluence space`)
    .action(async (spaceKey: string) => {
        const destination = path.resolve(process.cwd(), 'output');
        const output = initOutput({ spaceKey, destination });
        await extractSpace(spaceKey, output);
    });

program
    .command('extract-blogs <spaceKey>')
    .description('extract all blogs from a confluence space')
    .action(async (spaceKey: string) => {
        const destination = path.resolve(process.cwd(), 'output');
        const output = initOutput({ spaceKey, destination });
        await extractBlogs(spaceKey, output);
    });

program.version(require('../../package.json').version);
program.parse(process.argv);
