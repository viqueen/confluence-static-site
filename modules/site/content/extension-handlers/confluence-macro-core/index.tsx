import React from 'react';

import type {
    ExtensionParams,
    Parameters
} from '@atlaskit/editor-common/extensions';

import { Content } from '../../../../external/confluence-api/types';

import { BlogPostsMacro } from './blog-posts-macro';
import { ChildrenMacro } from './children-macro';
import { WidgetConnectorMacro } from './widget-connector-macro';

export const confluenceMacroCore = (content: Content) => {
    // eslint-disable-next-line react/display-name
    return (ext: ExtensionParams<Parameters>) => {
        switch (ext.extensionKey) {
            case 'blog-posts':
                return <BlogPostsMacro />;
            case 'children':
                return (
                    <ChildrenMacro
                        parent={ext.parameters?.macroParams.page?.value}
                        content={content}
                    />
                );
            case 'widget':
                return (
                    <WidgetConnectorMacro
                        url={ext.parameters?.macroParams.url.value}
                    />
                );
            default:
                console.warn(
                    '** missing extension handler',
                    ext.extensionKey,
                    ext
                );
                return null;
        }
    };
};
