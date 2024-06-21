#! /usr/bin/env node

/**
 * Copyright 2023 Hasnae Rehioui
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as fs from 'fs';
import * as path from 'path';

import { Command } from 'commander';

import { confluence } from './clients';
import { webpackBuild } from './commands/build/webpack.build';
import { defaultSiteProperties } from './commands/build/webpack.config';
import {
    extractBlogs,
    extractSpace,
    generateAttachmentsThumbnails
} from './commands/extract';
import { extractContent } from './commands/extract/extract-content';
import { extractPageTree } from './commands/extract/extract-page-tree';
import { extractSiteEmojis } from './commands/extract/extract-site-emojis';
import { init } from './commands/init';
import { initOutput } from './conf';

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
    .command('generate-thumbnails <spaceKey>')
    .description('generate attachment thumbnails for a confluence space')
    .option('--force', 'enforce generating thumbnails', false)
    .action(async (spaceKey: string, options) => {
        const destination = path.resolve(process.cwd(), 'output');
        const output = initOutput({ spaceKey, destination });
        await generateAttachmentsThumbnails(output, options);
    });

program
    .command('extract-content <spaceKey> <contentId>')
    .description('extract specific content from a confluence space')
    .option('--force', 'enforce extracting content assets', false)
    .action(async (spaceKey: string, id: string, options) => {
        const destination = path.resolve(process.cwd(), 'output');
        const output = initOutput({ spaceKey, destination });
        const content = await confluence.getContentById({ id }, false);
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

// eslint-disable-next-line @typescript-eslint/no-var-requires
program.version(require('../../package.json').version);
program.parse(process.argv);
