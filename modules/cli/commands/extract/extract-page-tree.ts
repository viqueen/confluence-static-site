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
import { Content, Identifier } from '../../../apis';
import { confluence } from '../../clients';
import { Changelog, Output } from '../../conf';

import { extractContent } from './extract-content';

export const extractPageTree = async (
    id: Identifier,
    output: Output,
    changelog: Changelog,
    options = { asHomepage: false, force: false }
): Promise<Content> => {
    const { asHomepage, force } = options;
    const content = await confluence.getContentById(id, asHomepage);
    await extractContent(content, output, changelog, { force });

    if (content.childPages) {
        for (const child of content.childPages) {
            await extractPageTree(child, output, changelog, {
                ...options,
                asHomepage: false
            });
        }
    }

    return content;
};
