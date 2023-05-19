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
