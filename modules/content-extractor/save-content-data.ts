import { Content } from '../confluence-api/types';
import { Output } from '../configuration/types';
import { scrubContent } from '../confluence-api/adf-processor';
import fs from 'fs';
import path from 'path';
import { titleToPath } from '../confluence-api/helpers';

const resolveContentPath = (content: Content, output: Output) => {
    if (content.asHomepage) return output.home;
    const root = content.type === 'page' ? output.pages : output.blogs;
    return path.resolve(root, titleToPath(content.identifier.title));
};

const symlinkForInternals = (content: Content, output: Output) => {
    if (content.asHomepage) return;
    const directory = content.type === 'page' ? output.pages : output.blogs;
    const symlink = path.resolve(directory, content.identifier.id);
    if (fs.existsSync(symlink)) return;
    fs.symlinkSync(
        path.resolve(directory, titleToPath(content.identifier.title)),
        symlink
    );
};

export const saveContentData = async (content: Content, output: Output) => {
    const scrubbed = scrubContent(content.body);
    const data: Content = {
        ...content,
        body: scrubbed,
        attachments: []
    };
    const contentPath = resolveContentPath(content, output);
    fs.mkdirSync(contentPath, { recursive: true });
    fs.writeFileSync(
        path.resolve(contentPath, 'data.json'),
        JSON.stringify(data)
    );
    symlinkForInternals(content, output);
};
