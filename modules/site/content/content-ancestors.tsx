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

import Breadcrumbs, { BreadcrumbsItem } from '@atlaskit/breadcrumbs';

import { titleToPath } from '../../external/confluence-api/helpers/title-to-path';
import { Content, Identifier } from '../../external/confluence-api/types';

type ContentAncestorsProps = {
    content: Content;
};

export const ContentAncestors = ({ content }: ContentAncestorsProps) => {
    if (content.type === 'blogpost' || content.asHomepage) return <></>;
    return (
        <div style={{ margin: 40 }}>
            <Breadcrumbs>
                {content.parentPages?.map((item: Identifier, index: number) => {
                    const href =
                        index === 0
                            ? '/'
                            : `/notes/${titleToPath(item.title)}/`;
                    const text = index === 0 ? 'Home' : item.title;
                    return (
                        <BreadcrumbsItem href={href} text={text} key={index} />
                    );
                })}
            </Breadcrumbs>
        </div>
    );
};
