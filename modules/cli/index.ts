#! /usr/bin/env node

import { Command } from 'commander';
import * as path from 'path';
import { initOutput } from '../configuration';
import { extractBlogs, extractSpace } from '../content-extractor';
import { webpackConfig } from './webpack.config';
import { webpack } from 'webpack';
import Server from 'webpack-dev-server';

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

program
    .command('build <spaceKey>')
    .description('builds the site resources for a given confluence space')
    .option('--serve', 'with dev server running', false)
    .action(async (spaceKey: string, options) => {
        const { config, siteOutput } = webpackConfig(spaceKey);
        const compiler = webpack(config);
        if (options.serve === true) {
            const devServer = {
                static: { directory: siteOutput },
                client: { progress: true },
                compress: true,
                port: 9000,
                open: true
            };
            const server = new Server(devServer, compiler);
            const runServer = async () => {
                console.log('Starting server...');
                await server.start();
            };
            await runServer();
        } else {
            compiler.run((error, stats) => {
                if (error) {
                    console.error(error.stack || error);
                    return;
                }
                console.info(
                    stats?.toString({
                        chunks: false, // Makes the build much quieter
                        colors: true // Shows colors in the console
                    })
                );
            });
        }
    });

program.version(require('../../package.json').version);
program.parse(process.argv);
