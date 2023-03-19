import React from 'react';
import { IntlProvider } from 'react-intl-next';
import { Content } from '../../external/confluence-api/types';
import { Provider } from '@atlaskit/smart-card';
import { SimpleCardClient } from './simple-card-client';
import { ReactRenderer } from '@atlaskit/renderer';
import { dataProviders } from './data-providers';
import { extensionHandlers } from './extension-handlers';
import { MediaViewerProvider } from './media-viewer-provider';

type ContentRendererProps = {
    content: Content;
};

export const ContentRenderer = ({ content }: ContentRendererProps) => {
    const attachments = content.attachments ?? [];
    return (
        <Provider client={new SimpleCardClient()}>
            <IntlProvider locale="en">
                <MediaViewerProvider attachments={attachments}>
                    <ReactRenderer
                        document={content.body}
                        allowCopyToClipboard={true}
                        dataProviders={dataProviders()}
                        extensionHandlers={extensionHandlers(content)}
                    />
                </MediaViewerProvider>
            </IntlProvider>
        </Provider>
    );
};
