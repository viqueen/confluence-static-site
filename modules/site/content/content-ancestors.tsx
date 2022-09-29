import { Content } from '../../confluence-api/types';
import React from 'react';

type ContentAncestors = {
    content: Content;
};

export const ContentAncestors = ({ content }: ContentAncestors) => {
    if (content.type === 'blogpost' || content.asHomepage) return <></>;
    // TODO : display page ancestors
    return <></>;
};
