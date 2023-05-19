import React from 'react';

import { Content } from '../../../../../external/confluence-api/types';

import { HomePageChildrenMacro } from './home-page-children-macro';
import { RegularPageChildrenMacro } from './regular-page-children-macro';

type ChildrenMacroProps = {
    parent?: string;
    content: Content;
};

export const ChildrenMacro = ({ parent, content }: ChildrenMacroProps) => {
    if (content.asHomepage) {
        return <HomePageChildrenMacro content={content} parent={parent} />;
    } else {
        return <RegularPageChildrenMacro content={content} parent={parent} />;
    }
};
