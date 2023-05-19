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
