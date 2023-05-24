/**
 * Copyright 2023 Hasnae Rehioui
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';

import type {
    ExtensionParams,
    Parameters
} from '@atlaskit/editor-common/extensions';

import { Content } from '../../../../external/confluence-api/types';

import { BlogPostsMacro } from './blog-posts-macro';
import { ChildrenMacro } from './children-macro';
import { RecentlyUpdatedMacro } from './recently-updated-macro';
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
            case 'recently-updated':
                return <RecentlyUpdatedMacro />;
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
