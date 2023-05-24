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
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

import { filter } from '@atlaskit/adf-utils/traverse';

import { Output } from '../../../configuration/types';
import { confluenceApi } from '../../../external/confluence-api';
import { rewriteUrl } from '../../../external/confluence-api/helpers/rewrite-url';
import { Content } from '../../../external/confluence-api/types';

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

    const resolvedObjects = await confluenceApi.getObjects(inlineCards);
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
            .createHash('sha512')
            .update(definition.url)
            .digest('hex');
        fs.writeFileSync(
            path.resolve(output.objectResolver, `${urlHash}.json`),
            JSON.stringify(definition)
        );
    });
};
