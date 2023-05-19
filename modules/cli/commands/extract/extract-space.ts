import fs from 'fs';
import path from 'path';

import { Output } from '../../../configuration/types';
import { confluenceApi } from '../../../external/confluence-api';
import { titleToPath } from '../../../external/confluence-api/helpers/title-to-path';

import { extractBlogs } from './extract-blogs';
import { extractPageTree } from './extract-page-tree';
import { generateAttachmentsThumbnails } from './generate-attachments-thumbnails';

export const extractSpace = async (
    spaceKey: string,
    output: Output,
    options = { force: false }
) => {
    console.info(`🪐 extract-space: ${spaceKey}`);
    const homepageId = await confluenceApi.getSpaceHomepage(spaceKey);

    console.info(`🏠 process space home`, homepageId);
    const homepage = await extractPageTree(homepageId, output, {
        ...options,
        asHomepage: true
    });
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
        .reduce((prev, current) => {
            const byYear = prev[current.createdYear] || [];
            byYear.push(current);
            prev[current.createdYear] = byYear;
            return prev;
        }, {} as Record<number, { href: string; title: string; createdYear: number }[]>);

    const navigation = {
        notes,
        articles
    };

    fs.writeFileSync(
        path.resolve(output.home, 'navigation.json'),
        JSON.stringify(navigation)
    );
};
