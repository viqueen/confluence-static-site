import { Configuration } from 'webpack';
import path from 'path';
import { listFiles } from 'fs-directory';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export const webpackConfig = (
    spaceKey: string
): { config: Configuration; siteOutput: string } => {
    const siteSources = path.join(process.cwd(), 'modules', 'site');
    const siteOutput = path.join(process.cwd(), 'output', 'site', spaceKey);
    const templatesDirectory = path.join(
        process.cwd(),
        'output',
        'templates',
        spaceKey
    );

    const indexFiles = listFiles(templatesDirectory, {
        fileFilter: (entry) => entry.name === 'index.html',
        directoryFilter: () => true
    });

    const htmlPlugins = indexFiles.map((template) => {
        const filename = template.replace(`${templatesDirectory}/`, '');
        return new HtmlWebpackPlugin({
            template,
            filename
        });
    });

    const config: Configuration = {
        mode: 'development',
        entry: {
            site: path.resolve(siteSources, 'index.tsx')
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            fallback: {
                crypto: require.resolve('crypto-browserify'),
                os: require.resolve('os-browserify/browser'),
                path: require.resolve('path-browserify'),
                stream: require.resolve('stream-browserify')
            }
        },
        stats: {
            warningsFilter: [/Should not import the named export/]
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
        },
        plugins: [...htmlPlugins]
    };
    return { config, siteOutput };
};
