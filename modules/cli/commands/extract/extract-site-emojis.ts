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

import axios from 'axios';

import { configuration } from '../../../configuration';
import { Output } from '../../../configuration/types';

export const extractSiteEmojis = async (
    output: Output,
    options = { force: false }
) => {
    const siteId = configuration.CONFLUENCE_SITE_ID;
    if (!siteId) {
        return;
    }

    const adminClient = axios.create({
        baseURL: 'https://admin.atlassian.com'
    });
    const mediaClient = axios.create({
        baseURL: 'https://api.media.atlassian.com'
    });

    const { data } = await adminClient.get(
        `/gateway/api/emoji/${siteId}/site`,
        {
            headers: {
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                cookie: `cloud.session.token=${configuration.CONFLUENCE_CLOUD_TOKEN}`
            }
        }
    );

    const collection = `emoji-site-${siteId}`;
    const { clientId, jwt } = data.meta.mediaApiToken;
    for (const emoji of data.emojis) {
        const filePath = path.resolve(output.assets.emojis, `${emoji.id}.png`);
        if (fs.existsSync(filePath) && !options.force) continue;

        const { mediaFileId } = emoji.representation;
        const { data: stream } = await mediaClient.get(
            `/file/${mediaFileId}/image?width=64&height=64&client=${clientId}&token=${jwt}&collection=${collection}`,
            { responseType: 'stream' }
        );
        const file = fs.createWriteStream(filePath);
        stream.pipe(file);
    }
};
