import { configuration } from '../../../configuration';
import axios from 'axios';
import { Output } from '../../../configuration/types';
import path from 'path';
import * as fs from 'fs';

export const extractSiteEmojis = async (output: Output) => {
    const adminClient = axios.create({
        baseURL: 'https://admin.atlassian.com'
    });
    const mediaClient = axios.create({
        baseURL: 'https://api.media.atlassian.com'
    });

    const { data } = await adminClient.get(
        `/gateway/api/emoji/${configuration.CONFLUENCE_SITE_ID}/site`,
        {
            headers: {
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                cookie: `cloud.session.token=${configuration.CONFLUENCE_CLOUD_TOKEN}`
            }
        }
    );

    const collection = `emoji-site-${configuration.CONFLUENCE_SITE_ID}`;
    const { clientId, jwt } = data.meta.mediaApiToken;
    for (const emoji of data.emojis) {
        const filePath = path.resolve(output.assets.emojis, `${emoji.id}.png`);
        if (fs.existsSync(filePath)) continue;

        const { mediaFileId } = emoji.representation;
        const { data: stream } = await mediaClient.get(
            `/file/${mediaFileId}/image?width=64&height=64&client=${clientId}&token=${jwt}&collection=${collection}`,
            { responseType: 'stream' }
        );
        const file = fs.createWriteStream(filePath);
        stream.pipe(file);
    }
};
