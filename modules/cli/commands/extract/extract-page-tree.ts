import { extractContent } from './extract-content';
import { Identifier } from '../../../confluence-api/types';
import { Output } from '../../../configuration/types';
import { api } from '../../../confluence-api';

export const extractPageTree = async (
    id: Identifier,
    output: Output,
    asHomepage = false
) => {
    const content = await api.getContentById(id, asHomepage);
    await extractContent(content, output);

    if (!content.children) return;
    for (const child of content.children) {
        await extractPageTree(child, output);
    }
};
