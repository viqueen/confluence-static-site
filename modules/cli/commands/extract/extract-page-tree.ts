import { extractContent } from './extract-content';
import { Identifier } from '../../../confluence-api/types';
import { Output } from '../../../configuration/types';
import { api } from '../../../confluence-api';

export const extractPageTree = async (
    id: Identifier,
    output: Output,
    options = { asHomepage: false, force: false }
) => {
    const { asHomepage, force } = options;
    const content = await api.getContentById(id, asHomepage);
    await extractContent(content, output, { force });

    if (!content.children) return;
    for (const child of content.children) {
        await extractPageTree(child, output, { ...options, asHomepage: false });
    }
};
