import { Configuration } from 'webpack';
import * as path from 'path';

const siteSources = path.join(__dirname, 'src', 'site');
const siteOutput = path.join(__dirname, 'output', 'site');

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

// noinspection JSUnusedGlobalSymbols
export default config;
