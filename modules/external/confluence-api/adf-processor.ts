import { extension } from '@atlaskit/adf-utils/builders';
import { scrubAdf } from '@atlaskit/adf-utils/scrub';
import type { ADFEntity } from '@atlaskit/adf-utils/types';

import { rewriteUrl } from './helpers/rewrite-url';

const identityProcessor = (node: ADFEntity) => {
    return node;
};

const inlineCardProcessor = (node: ADFEntity) => {
    const url = rewriteUrl(node.attrs?.url);
    return {
        type: node.type,
        attrs: {
            url
        }
    };
};

const mediaSingleProcessor = (node: ADFEntity) => {
    return extension({
        extensionType: 'org.viqueen.media',
        extensionKey: 'file',
        parameters: {
            ...node.attrs,
            data: node.content
        }
    });
};

export const scrubContent = (doc: any) => {
    return scrubAdf(doc, {
        nodeReplacements: {
            bulletList: identityProcessor,
            codeBlock: identityProcessor,
            date: identityProcessor,
            emoji: identityProcessor,
            expand: identityProcessor,
            extension: identityProcessor,
            heading: identityProcessor,
            inlineCard: inlineCardProcessor,
            inlineExtension: identityProcessor,
            media: identityProcessor,
            mediaSingle: mediaSingleProcessor,
            panel: identityProcessor,
            paragraph: identityProcessor,
            status: identityProcessor,
            table: identityProcessor,
            tableCell: identityProcessor,
            tableHeader: identityProcessor,
            tableRow: identityProcessor,
            text: identityProcessor
        }
    });
};
