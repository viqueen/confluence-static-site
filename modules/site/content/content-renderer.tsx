import React from 'react';
import { Content } from '../../confluence-api/types';
import { Provider } from '@atlaskit/smart-card';
import { SimpleCardClient } from './simple-card-client';
import { ReactRenderer } from '@atlaskit/renderer';
import { dataProviders } from './data-providers';
import { extensionHandlers } from './extension-handlers';

type ContentRendererProps = {
    content: Content;
};

export const ContentRenderer = ({ content }: ContentRendererProps) => {
    return (
        <Provider client={new SimpleCardClient()}>
            <ReactRenderer
                document={content.body}
                allowCopyToClipboard={true}
                dataProviders={dataProviders()}
                extensionHandlers={extensionHandlers(content)}
            />
        </Provider>
    );
};
