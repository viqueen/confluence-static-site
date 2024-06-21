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
import fs from 'fs';
import path from 'path';

import { titleToPath } from '../../../shared';
import { confluence } from '../../clients';
import { Output } from '../../conf';

import { extractBlogs } from './extract-blogs';
import { extractPageTree } from './extract-page-tree';
import { extractRecentlyUpdatedPages } from './extract-recently-updated-pages';
import { generateAttachmentsThumbnails } from './generate-attachments-thumbnails';

export const extractSpace = async (
    spaceKey: string,
    output: Output,
    options = { force: false }
) => {
    console.info(`🪐 extract-space: ${spaceKey}`);
    const homepageId = await confluence.getSpaceHomepage(spaceKey);

    console.info(`🏠 process space home`, homepageId);
    const homepage = await extractPageTree(homepageId, output, {
        ...options,
        asHomepage: true
    });
    await extractRecentlyUpdatedPages(spaceKey, output);

    const blogs = await extractBlogs(spaceKey, output, options);

    await generateAttachmentsThumbnails(output, options);

    const notes = homepage.childPages?.map(({ title, emoji }) => ({
        href: `/notes/${titleToPath(title)}/`,
        title,
        emoji
    }));
    const articles = blogs
        .map(({ identifier, createdYear }) => ({
            href: `/articles/${titleToPath(identifier.title)}/`,
            title: identifier.title,
            createdYear
        }))
        .reduce(
            (prev, current) => {
                const byYear = prev[current.createdYear] || [];
                byYear.push(current);
                prev[current.createdYear] = byYear;
                return prev;
            },
            {} as Record<
                number,
                { href: string; title: string; createdYear: number }[]
            >
        );

    const navigation = {
        notes,
        articles
    };

    fs.writeFileSync(
        path.resolve(output.home, 'navigation.json'),
        JSON.stringify(navigation)
    );
};
