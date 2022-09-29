import React from 'react';
import { ExtensionParams } from '@atlaskit/editor-common/extensions';
import { Content } from '../../../../confluence-api/types';
import { BlogPostsMacro } from './blog-posts-macro';

export const confluenceMacroCore = (content: Content) => {
    return (ext: ExtensionParams<any>) => {
        switch (ext.extensionKey) {
            case 'blog-posts':
                return <BlogPostsMacro />;
            default:
                return null;
        }
    };
};
