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

import { Output } from '../../../configuration/types';
import { confluenceApi } from '../../../external/confluence-api';
import { Content } from '../../../external/confluence-api/types';

import { extractContent } from './extract-content';

export const extractBlogs = async (
    spaceKey: string,
    output: Output,
    options = { force: false }
): Promise<Content[]> => {
    console.info('📙 extract blogs');
    const blogs = await confluenceApi.getSpaceBlogs(spaceKey);

    for (const blog of blogs) {
        const content = await confluenceApi.getContentById(blog.identifier);
        await extractContent(content, output, options);
    }

    fs.writeFileSync(
        path.resolve(output.home, 'blogs.json'),
        JSON.stringify(blogs)
    );

    return blogs;
};
