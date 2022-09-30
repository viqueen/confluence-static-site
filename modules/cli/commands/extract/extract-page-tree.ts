import { extractContent } from './extract-content';
import { Content, Identifier } from '../../../confluence-api/types';
import { Output } from '../../../configuration/types';
import { api } from '../../../confluence-api';
import { titleToPath } from '../../../confluence-api/helpers/title-to-path';
import * as fs from 'fs';
import * as path from 'path';

export const extractPageTree = async (
    id: Identifier,
    output: Output,
    options = { asHomepage: false, force: false }
): Promise<Content> => {
    const { asHomepage, force } = options;
    const content = await api.getContentById(id, asHomepage);
    await extractContent(content, output, { force });

    if (content.children) {
        for (const child of content.children) {
            await extractPageTree(child, output, {
                ...options,
                asHomepage: false
            });
        }
    }

    return content;
};
