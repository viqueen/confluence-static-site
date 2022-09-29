import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { Content } from '../../../confluence-api/types';
import { Output } from '../../../configuration/types';
import { filter } from '@atlaskit/adf-utils/traverse';
import { rewriteUrl } from '../../../confluence-api/helpers/rewrite-url';
import { api } from '../../../confluence-api';

export const extractObjects = async (content: Content, output: Output) => {
    const inlineCards = filter(
        content.body,
        (node) => node.type === 'inlineCard'
    ).map((item) => {
        return {
            resourceUrl: item.attrs?.url
        };
    });
    if (inlineCards.length < 1) return;

    const resolvedObjects = await api.getObjects(inlineCards);
    resolvedObjects.forEach((item) => {
        if (!item.body) {
            return;
        }
        const data = item.body.data;
        const { url, name, generator } = data;
        const definition = {
            name,
            generator,
            url: rewriteUrl(url),
            '@type': data['@type']
        };
        const urlHash = crypto
            .createHash('md5')
            .update(definition.url)
            .digest('hex');
        fs.writeFileSync(
            path.resolve(output.objectResolver, `${urlHash}.json`),
            JSON.stringify(definition)
        );
    });
};
