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
import path from 'path';

// eslint-disable-next-line import/default
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { listFiles } from 'fs-directory';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration, DefinePlugin } from 'webpack';

import { SiteProperties } from '../../../configuration/types';

const isDev = process.env.NODE_ENV === 'development';

export const defaultSiteProperties: SiteProperties = {
    title: 'confluence-static-site',
    iconUrl: '',
    name: '/conf',
    theme: {
        name: 'confluence-static-site',
        backgroundColor: 'rgb(0, 102, 68)',
        highlightColor: '#FFFFFF'
    }
};

const siteProperties = (): SiteProperties => {
    const file = path.resolve(process.cwd(), '.confluence-static-site.json');
    if (!fs.existsSync(file)) return defaultSiteProperties;
    const data = fs.readFileSync(file).toString('utf-8');
    const parsed = JSON.parse(data); // TODO: handle validation
    return parsed as SiteProperties;
};

export const webpackConfig = (props: {
    spaceKey: string;
    assets: string | undefined;
    dest: string;
}): { config: Configuration; siteOutput: string } => {
    const { spaceKey, assets, dest } = props;

    const siteSources = path.join(__dirname, '..', '..', '..', 'site');
    const siteOutput = path.join(process.cwd(), dest, 'site', spaceKey);
    const templatesDirectory = path.join(
        process.cwd(),
        dest,
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

    const definePlugin = new DefinePlugin({
        __SITE_PROPERTIES__: JSON.stringify(siteProperties())
    });

    const copyPlugin = assets
        ? new CopyWebpackPlugin({
              patterns: [
                  {
                      from: path.resolve(process.cwd(), assets),
                      to: path.resolve(siteOutput, 'assets')
                  }
              ]
          })
        : undefined;

    const plugins = copyPlugin
        ? [definePlugin, copyPlugin, ...htmlPlugins]
        : [definePlugin, ...htmlPlugins];

    const siteEntry = isDev
        ? path.resolve(siteSources, 'index.tsx')
        : path.resolve(siteSources, 'index.js');
    const config: Configuration = {
        mode: 'development',
        entry: {
            site: siteEntry
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.css'],
            fallback: {
                crypto: require.resolve('crypto-browserify'),
                events: false,
                http: false,
                https: false,
                os: require.resolve('os-browserify/browser'),
                path: require.resolve('path-browserify'),
                stream: require.resolve('stream-browserify'),
                url: require.resolve('url/'),
                zlib: false
            }
        },
        ignoreWarnings: [/Should not import the named export/],
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
        plugins
    };
    return { config, siteOutput };
};
