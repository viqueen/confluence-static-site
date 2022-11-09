import { Configuration, DefinePlugin } from 'webpack';
import path from 'path';
import { listFiles } from 'fs-directory';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { SiteProperties } from '../../../configuration/types';
import * as fs from 'fs';

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

    const config: Configuration = {
        mode: 'development',
        entry: {
            site: path.resolve(siteSources, 'index.js')
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.css'],
            fallback: {
                crypto: require.resolve('crypto-browserify'),
                os: require.resolve('os-browserify/browser'),
                path: require.resolve('path-browserify'),
                stream: require.resolve('stream-browserify'),
                events: false,
                https: false,
                http: false,
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
