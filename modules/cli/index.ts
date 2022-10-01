#! /usr/bin/env node

import { Command } from 'commander';
import * as path from 'path';
import { initOutput } from '../configuration';
import { extractBlogs, extractSpace } from './commands/extract';
import { webpackBuild } from './commands/build/webpack.build';
import { api } from '../confluence-api';
import { extractContent } from './commands/extract/extract-content';
import { extractSiteEmojis } from './commands/extract/extract-site-emojis';

const program = new Command();

program
    .command(`extract <spaceKey>`)
    .description(`extract all content and media from a confluence space`)
    .option('--force', 'enforce extracting content assets', false)
    .action(async (spaceKey: string, options) => {
        const destination = path.resolve(process.cwd(), 'output');
        const output = initOutput({ spaceKey, destination });
        await extractSpace(spaceKey, output, { ...options });
    });

program
    .command('extract-blogs <spaceKey>')
    .description('extract all blogs from a confluence space')
    .action(async (spaceKey: string) => {
        const destination = path.resolve(process.cwd(), 'output');
        const output = initOutput({ spaceKey, destination });
        await extractBlogs(spaceKey, output);
    });

program
    .command('extract-content <spaceKey> <contentId>')
    .description('extract specific content from a confluence space')
    .option('--force', 'enforce extracting content assets', false)
    .action(async (spaceKey: string, id: string, options) => {
        const destination = path.resolve(process.cwd(), 'output');
        const output = initOutput({ spaceKey, destination });
        const content = await api.getContentById({ id });
        await extractContent(content, output, options);
    });

program
    .command('extract-emojis <spaceKey>')
    .description('extract site assets')
    .action(async (spaceKey) => {
        const destination = path.resolve(process.cwd(), 'output');
        const output = initOutput({ spaceKey, destination });
        await extractSiteEmojis(output);
    });

program
    .command('build <spaceKey>')
    .description('builds the site resources for a given confluence space')
    .option('--serve', 'with dev server running', false)
    .action(async (spaceKey: string, options) => {
        await webpackBuild({ ...options, spaceKey });
    });

program.version(require('../../package.json').version);
program.parse(process.argv);
