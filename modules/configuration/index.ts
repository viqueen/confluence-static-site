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

import dotenv from 'dotenv';

import { Configuration, Output } from './types';

const parsedConfig: Configuration = (dotenv.config().parsed ||
    {}) as Configuration;
const configuration: Configuration = {
    CONFLUENCE_SITE_NAME:
        parsedConfig.CONFLUENCE_SITE_NAME ?? process.env.CONFLUENCE_SITE_NAME,
    CONFLUENCE_USERNAME:
        parsedConfig.CONFLUENCE_USERNAME ?? process.env.CONFLUENCE_USERNAME,
    CONFLUENCE_API_TOKEN:
        parsedConfig.CONFLUENCE_API_TOKEN ?? process.env.CONFLUENCE_API_TOKEN,
    CONFLUENCE_CLOUD_TOKEN:
        parsedConfig.CONFLUENCE_CLOUD_TOKEN ??
        process.env.CONFLUENCE_CLOUD_TOKEN,
    TARGET_SITE: parsedConfig.TARGET_SITE ?? process.env.TARGET_SITE,
    TWITTER_SITE: parsedConfig.TWITTER_SITE ?? process.env.TWITTER_SITE,
    GOOGLE_ANALYTICS_TRACKING_ID:
        parsedConfig.GOOGLE_ANALYTICS_TRACKING_ID ??
        process.env.GOOGLE_ANALYTICS_TRACKING_ID,
    OAUTH_CLIENT_ID:
        parsedConfig.OAUTH_CLIENT_ID ?? process.env.OAUTH_CLIENT_ID,
    OAUTH_CLIENT_SECRET:
        parsedConfig.OAUTH_CLIENT_SECRET ?? process.env.OAUTH_CLIENT_SECRET,
    CONFLUENCE_SITE_ID:
        parsedConfig.CONFLUENCE_SITE_ID ?? process.env.CONFLUENCE_SITE_ID
};

const makeOutputDirectories = (data: object) => {
    for (const dir of Object.values(data)) {
        if (typeof dir === 'string') fs.mkdirSync(dir, { recursive: true });
        else makeOutputDirectories(dir);
    }
};

const initOutput = (props: {
    spaceKey: string;
    destination: string;
}): Output => {
    const { spaceKey, destination } = props;
    const siteOutput = path.resolve(destination, 'site', spaceKey);
    const output: Output = {
        home: siteOutput,
        assets: {
            avatars: path.resolve(siteOutput, 'assets', 'avatars'),
            emojis: path.resolve(siteOutput, 'assets', 'emojis')
        },
        attachments: path.resolve(siteOutput, 'attachments'),
        pages: path.resolve(siteOutput, 'notes'),
        blogs: path.resolve(siteOutput, 'articles'),
        objectResolver: path.resolve(siteOutput, 'object-resolver'),
        templates: path.resolve(destination, 'templates', spaceKey)
    };
    makeOutputDirectories(output);
    return output;
};

export { configuration, initOutput };
