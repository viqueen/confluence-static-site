import { extractContent } from './extract-content';
import * as fs from 'fs';
import * as path from 'path';
import { Output } from '../../../configuration/types';
import { api } from '../../../confluence-api';

export const extractBlogs = async (spaceKey: string, output: Output) => {
    console.info('📙 extract blogs');
    const blogs = await api.getSpaceBlogs(spaceKey);

    for (const blog of blogs) {
        const content = await api.getContentById(blog.identifier);
        await extractContent(content, output);
    }

    fs.writeFileSync(
        path.resolve(output.home, 'blog.json'),
        JSON.stringify(blogs)
    );
};
