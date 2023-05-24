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
import { Compiler, webpack } from 'webpack';
import Server from 'webpack-dev-server';

import { webpackConfig } from './webpack.config';

const runDevServer = async (
    props: { siteOutput: string; open: boolean },
    compiler: Compiler
) => {
    const devServer = {
        static: { directory: props.siteOutput },
        client: { progress: true },
        compress: true,
        port: 9000,
        open: props.open
    };
    const server = new Server(devServer, compiler);
    const runServer = async () => {
        console.info('Starting server...');
        await server.start();
    };
    await runServer();
};

const runCompiler = async (compiler: Compiler) => {
    compiler.run((error, stats) => {
        if (error) {
            console.error(error.stack || error);
            return;
        }
        console.info(
            stats?.toString({
                errorDetails: true,
                chunks: false, // Makes the build much quieter
                colors: true // Shows colors in the console
            })
        );
    });
};

export const webpackBuild = async (props: {
    serve: boolean;
    assets: string | undefined;
    spaceKey: string;
    dest: string;
    open: boolean;
}) => {
    const { serve, spaceKey, assets, dest, open } = props;
    const { config, siteOutput } = webpackConfig({ spaceKey, assets, dest });
    if (serve) {
        const compiler = webpack(config);
        await runDevServer({ siteOutput, open }, compiler);
    } else {
        const compiler = webpack({ ...config, mode: 'production' });
        await runCompiler(compiler);
    }
};
