import * as fs from 'fs';
import * as path from 'path';
import ReactDOMServer from 'react-dom/server';
import { Content } from '../confluence-api/types';
import { Output } from '../configuration/types';
import { titleToPath } from '../confluence-api/helpers';
import { extractObjects } from './extract-objects';
import { extractAttachments } from './extract-attachments';
import { extractAssets } from './extract-assets';
import { saveContentData } from './save-content-data';
import { StaticWrapper } from './static-wrapper';

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

const saveContentHtml = async (content: Content, output: Output) => {
    const indexHtml = ReactDOMServer.renderToStaticMarkup(
        StaticWrapper(content)
    );
    const subPath = content.type === 'page' ? 'notes' : 'articles';
    const templatePath = content.asHomepage
        ? output.templates
        : path.resolve(
              output.templates,
              subPath,
              titleToPath(content.identifier.title)
          );
    fs.mkdirSync(templatePath, { recursive: true });
    fs.writeFileSync(
        path.resolve(templatePath, 'index.html'),
        `<!DOCTYPE html>\n${indexHtml}`
    );
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
