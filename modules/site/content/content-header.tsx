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

import Heading from '@atlaskit/heading';
import Blog24Icon from '@atlaskit/icon-object/glyph/blog/24';
import Page24Icon from '@atlaskit/icon-object/glyph/page/24';

import { Content } from '../../apis';
import './content-header.css';

type ContentHeaderProps = {
    content: Content;
};

type ContentType = 'page' | 'blogpost';

type ContentTypeLogoProps = {
    type: ContentType;
    emoji?: string;
};

const ContentTypeLogo = (props: ContentTypeLogoProps) => {
    if (props.emoji) {
        return (
            <span>
                <img
                    alt={props.emoji}
                    src={`/assets/emojis/${props.emoji}.png`}
                    height={24}
                    width={24}
                />
            </span>
        );
    }
    switch (props.type) {
        case 'blogpost':
            return <Blog24Icon label="blog" />;
        case 'page':
        default:
            return <Page24Icon label="page" />;
    }
};

export const ContentHeader = ({ content }: ContentHeaderProps) => {
    if (content.asHomepage) return <></>;
    return (
        <div className="content-header">
            <ContentTypeLogo type={content.type} emoji={content.emoji} />
            <Heading size="xlarge">{content.identifier.title}</Heading>
        </div>
    );
};
