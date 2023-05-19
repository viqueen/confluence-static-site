#! /usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';

import { Command } from 'commander';

import { cliOauthClient } from '../cli-oauth-client';
import { initOutput } from '../configuration';
import { AccessibleResource, atlassianApi } from '../external/atlassian-api';
import { confluenceApi } from '../external/confluence-api';

import { webpackBuild } from './commands/build/webpack.build';
import { defaultSiteProperties } from './commands/build/webpack.config';
import { extractBlogs, extractSpace } from './commands/extract';
import { extractContent } from './commands/extract/extract-content';
import { extractPageTree } from './commands/extract/extract-page-tree';
import { extractSiteEmojis } from './commands/extract/extract-site-emojis';
import { init } from './commands/init';

const program = new Command();

program
    .command(`extract <spaceKey>`)
    .description(`extract all content and media from a confluence space`)
    .option('--force', 'enforce extracting content assets', false)
    .action(async (spaceKey: string, options) => {
        const destination = path.resolve(process.cwd(), 'output');
        const output = initOutput({ spaceKey, destination });
        await extractSpace(spaceKey, output, { ...options });
        await extractSiteEmojis(output, options);
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
        const content = await confluenceApi.getContentById({ id });
        await extractContent(content, output, options);
    });

program
    .command('extract-page-tree <spaceKey> <contentId>')
    .description('extract specific page tree from a confluence space')
    .option('--force', 'enforce extracting content assets', false)
    .option('--dest <dest>', 'with output destination', 'output')
    .action(async (spaceKey: string, id: string, options) => {
        const destination = path.resolve(process.cwd(), options.dest);
        const output = initOutput({ spaceKey, destination });
        await extractPageTree({ id, title: '' }, output, {
            ...options,
            asHomepage: true
        }).catch((error) => console.error(error.response.data));
    });

program
    .command('extract-emojis <spaceKey>')
    .description('extract site assets')
    .option('--dest <dest>', 'with output destination', 'output')
    .option('--force', 'enforce extracting content assets', false)
    .action(async (spaceKey, options) => {
        const destination = path.resolve(process.cwd(), options.dest);
        const output = initOutput({ spaceKey, destination });
        await extractSiteEmojis(output, options);
    });

program
    .command('build <spaceKey>')
    .description('builds the site resources for a given confluence space')
    .option('--assets <value>', 'with assets')
    .option('--dest <dest>', 'with output destination', 'output')
    .option('--serve', 'with dev server running', false)
    .option('--open', 'with open browser session in dev server', false)
    .action(async (spaceKey: string, options) => {
        await webpackBuild({ ...options, spaceKey });
    });

program
    .command('env')
    .description('initialise .env')
    .action(async () => {
        await init();
    });

program
    .command('config')
    .description('initialise .confluence-static-site.json')
    .action(async () => {
        const configFile = path.resolve(
            process.cwd(),
            '.confluence-static-site.json'
        );
        fs.writeFileSync(
            configFile,
            JSON.stringify(defaultSiteProperties, null, 2)
        );
    });

program
    .command('login')
    .description('login to confluence static site with oauth')
    .action(async () => {
        await cliOauthClient.login();
    });

program
    .command('init-site <name>')
    .description('initialise site info')
    .action(async (name: string) => {
        const atlassian = await atlassianApi();
        const { data } = await atlassian.accessibleResources();
        const site = data.find((i: AccessibleResource) => i.name === name);
        if (site) {
            const envFile = path.resolve(process.cwd(), '.env');
            fs.appendFileSync(envFile, `\nCONFLUENCE_SITE_ID=${site.id}`);
        }
    });

// eslint-disable-next-line @typescript-eslint/no-var-requires
program.version(require('../../package.json').version);
program.parse(process.argv);
