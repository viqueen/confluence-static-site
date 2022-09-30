import React from 'react';
import { ExtensionParams } from '@atlaskit/editor-common/extensions';
import { Content } from '../../../../confluence-api/types';
import { BlogPostsMacro } from './blog-posts-macro';
import { WidgetConnectorMacro } from './widget-connector-macro';
import { ChildrenMacro } from './children-macro';

export const confluenceMacroCore = (content: Content) => {
    return (ext: ExtensionParams<any>) => {
        switch (ext.extensionKey) {
            case 'blog-posts':
                return <BlogPostsMacro />;
            case 'children':
                const parent = ext.parameters.macroParams.page?.value;
                return <ChildrenMacro parent={parent} content={content} />;
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
