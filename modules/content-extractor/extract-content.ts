import { Content } from '../confluence-api/types';
import { Output } from '../configuration/types';
import { titleToPath } from '../confluence-api/helpers';
import * as path from 'path';
import * as fs from 'fs';
import { extractObjects } from './extract-objects';
import { extractAttachments } from './extract-attachments';
import { extractAssets } from './extract-assets';

const shouldExtractContentData = (
    content: Content,
    output: Output,
    options: { force: boolean }
): boolean => {
    if (options.force) return true;
    const target = content.type === 'page' ? output.pages : output.blogs;
    const dataFile = path.resolve(
        target,
        titleToPath(content.identifier.title)
    );
    if (!fs.existsSync(dataFile)) return true;

    const fileStats = fs.statSync(dataFile);
    const lastUpdated = fileStats.mtime.getTime();

    return lastUpdated < content.lastModifiedDate;
};

const saveContentData = async (content: Content, output: Output) => {
    // TODO: write data.json
};

const saveContentHtml = async (content: Content, output: Output) => {
    // TODO: write index.html
};

export const extractContent = async (
    content: Content,
    output: Output,
    options = { force: false }
) => {
    if (shouldExtractContentData(content, output, options)) {
        console.info(`📑 extract content`, content.identifier);
        await extractObjects(content, output);
        await extractAttachments(content, output);
        await extractAssets(content, output);
        await saveContentData(content, output);
    } else {
        console.info(`⚡️ skipped content`, content.identifier);
    }

    // static templates might change, this is not an expensive call anyway
    await saveContentHtml(content, output);
};
