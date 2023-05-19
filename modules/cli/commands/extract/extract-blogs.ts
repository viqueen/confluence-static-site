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
