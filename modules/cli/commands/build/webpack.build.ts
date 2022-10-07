import { Compiler, webpack } from 'webpack';
import Server from 'webpack-dev-server';
import { webpackConfig } from './webpack.config';

const runDevServer = async (siteOutput: string, compiler: Compiler) => {
    const devServer = {
        static: { directory: siteOutput },
        client: { progress: true },
        compress: true,
        port: 9000,
        open: true
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
}) => {
    const { serve, spaceKey, assets } = props;
    const { config, siteOutput } = webpackConfig(spaceKey, assets);
    if (serve) {
        const compiler = webpack(config);
        await runDevServer(siteOutput, compiler);
    } else {
        const compiler = webpack({ ...config, mode: 'production' });
        await runCompiler(compiler);
    }
};
