import { Configuration } from 'webpack';
import path from 'path';

export const webpackConfig = (
    spaceKey: string
): { config: Configuration; siteOutput: string } => {
    const siteSources = path.join(process.cwd(), 'modules', 'site');
    const siteOutput = path.join(process.cwd(), 'output', 'site', spaceKey);
    const config: Configuration = {
        mode: 'development',
        entry: {
            site: path.resolve(siteSources, 'index.tsx')
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: '/node_modules/'
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [
                        {
                            loader: 'file-loader'
                        }
                    ]
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader']
                }
            ]
        },
        target: 'web',
        output: {
            filename: '[name].js',
            path: siteOutput,
            publicPath: '/'
        }
    };
    return { config, siteOutput };
};
