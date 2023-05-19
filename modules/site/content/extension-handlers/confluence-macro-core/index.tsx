import type { ExtensionParams } from '@atlaskit/editor-common/extensions';
import React from 'react';

import { Content } from '../../../../external/confluence-api/types';

import { BlogPostsMacro } from './blog-posts-macro';
import { ChildrenMacro } from './children-macro';
import { WidgetConnectorMacro } from './widget-connector-macro';

export const confluenceMacroCore = (content: Content) => {
    return (ext: ExtensionParams<any>) => {
        switch (ext.extensionKey) {
            case 'blog-posts':
                return <BlogPostsMacro />;
            case 'children':
                return (
                    <ChildrenMacro
                        parent={ext.parameters.macroParams.page?.value}
                        content={content}
                    />
                );
            case 'widget':
                return (
                    <WidgetConnectorMacro
                        url={ext.parameters.macroParams.url.value}
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
