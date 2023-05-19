import React from 'react';

import Heading from '@atlaskit/heading';
import Blog24Icon from '@atlaskit/icon-object/glyph/blog/24';
import Page24Icon from '@atlaskit/icon-object/glyph/page/24';

import { Content } from '../../external/confluence-api/types';

import './content-header.css';

type ContentHeaderProps = {
    content: Content;
};

type ContentType = 'page' | 'blogpost';
const ContentTypeLogo = (props: { type: ContentType }) => {
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
            <ContentTypeLogo type={content.type} />
            <Heading level="h800">{content.identifier.title}</Heading>
        </div>
    );
};
