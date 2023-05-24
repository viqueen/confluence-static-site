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

import Spinner from '@atlaskit/spinner';
import axios from 'axios';

import { titleToPath } from '../../../../../external/confluence-api/helpers/title-to-path';
import {
    Content,
    Identifier
} from '../../../../../external/confluence-api/types';

type ChildrenMacroProps = {
    parent?: string;
    content: Content;
};

export const RegularPageChildrenMacro = ({
    parent,
    content
}: ChildrenMacroProps) => {
    const [loading, setLoading] = useState(true);
    const [childPages, setChildPages] = useState<Identifier[]>([]);

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
        fetchData().then((data) => {
            setChildPages(data.children);
            setLoading(false);
        });
    }, []);

    return (
        <div>
            {loading && <Spinner size="small" />}
            {!loading && childPages.length > 0 && (
                <ul style={{ marginTop: 0 }}>
                    {childPages.map((child: { id: string; title: string }) => {
                        return (
                            <li key={child.id}>
                                <a
                                    href={`/notes/${titleToPath(child.title)}/`}
                                    style={{
                                        textDecoration: 'none',
                                        color: '#0052CC',
                                        fontSize: 16
                                    }}
                                >
                                    {child.title}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};
