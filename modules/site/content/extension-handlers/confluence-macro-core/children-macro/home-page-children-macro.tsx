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
import React, { useEffect, useState } from 'react';

import LabelIcon from '@atlaskit/icon/glyph/label';
import Spinner from '@atlaskit/spinner';
import axios from 'axios';

import { Content, Identifier } from '../../../../../apis';
import { titleToPath } from '../../../../../external/confluence-api/helpers/title-to-path';

import './home-page-children-macro.css';

type ChildrenMacroProps = {
    parent?: string;
    content: Content;
};

type IdentifierWithEmoji = Identifier & { emoji?: string };

const HomePageChildItem = ({
    title,
    emoji
}: {
    title: string;
    emoji?: string;
}) => {
    const iconBefore = emoji ? (
        <img src={`/assets/emojis/${emoji}.png`} height={18} width={18} />
    ) : (
        <LabelIcon label="topic" />
    );
    const href = `/notes/${titleToPath(title)}/`;
    return (
        <div className="home-page-child-item">
            {iconBefore}
            <a href={href}>{title}</a>
        </div>
    );
};

export const HomePageChildrenMacro = ({
    parent,
    content
}: ChildrenMacroProps) => {
    const [loading, setLoading] = useState(true);
    const [childPages, setChildPages] = useState<IdentifierWithEmoji[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (parent) {
                setLoading(true);
                const { data } = await axios.get(
                    `/notes/${titleToPath(parent)}/data.json`
                );
                return { children: data.childPages || [] };
            } else {
                return { children: content.childPages || [] };
            }
        };
        fetchData()
            .then((data) => {
                setChildPages(data.children);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    return (
        <div>
            {loading && <Spinner size="small" />}
            {!loading && childPages.length > 0 && (
                <div className="home-page-children">
                    {childPages.map((child) => (
                        <HomePageChildItem
                            title={child.title}
                            emoji={child.emoji}
                            key={child.id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
