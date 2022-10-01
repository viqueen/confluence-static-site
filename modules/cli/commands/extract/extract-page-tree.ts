import { extractContent } from './extract-content';
import { Content, Identifier } from '../../../confluence-api/types';
import { Output } from '../../../configuration/types';
import { api } from '../../../confluence-api';

export const extractPageTree = async (
    id: Identifier,
    output: Output,
    options = { asHomepage: false, force: false }
): Promise<Content> => {
    const { asHomepage, force } = options;
    const content = await api.getContentById(id, asHomepage);
    await extractContent(content, output, { force });

    if (content.childPages) {
        for (const child of content.childPages) {
            await extractPageTree(child, output, {
                ...options,
                asHomepage: false
            });
        }
    }

    return content;
};
