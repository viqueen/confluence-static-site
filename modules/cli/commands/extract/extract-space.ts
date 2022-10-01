import { extractPageTree } from './extract-page-tree';
import { extractBlogs } from './extract-blogs';
import { Output } from '../../../configuration/types';
import { api } from '../../../confluence-api';
import { titleToPath } from '../../../confluence-api/helpers/title-to-path';
import fs from 'fs';
import path from 'path';

export const extractSpace = async (
    spaceKey: string,
    output: Output,
    options = { force: false }
) => {
    console.info(`🪐 extract-space: ${spaceKey}`);
    const homepageId = await api.getSpaceHomepage(spaceKey);

    console.info(`🏠 process space home`, homepageId);
    const homepage = await extractPageTree(homepageId, output, {
        ...options,
        asHomepage: true
    });
    const blogs = await extractBlogs(spaceKey, output, options);

    const notes = homepage.childPages?.map(({ title, emoji }) => ({
        href: `/notes/${titleToPath(title)}/`,
        title,
        emoji
    }));
    const articles = blogs.map(({ identifier }) => ({
        href: `/articles/${titleToPath(identifier.title)}/`,
        title: identifier.title
    }));

    const navigation = {
        notes,
        articles
    };

    fs.writeFileSync(
        path.resolve(output.home, 'navigation.json'),
        JSON.stringify(navigation)
    );
};
