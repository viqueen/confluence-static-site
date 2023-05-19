import Spinner from '@atlaskit/spinner';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { titleToPath } from '../../../../external/confluence-api/helpers/title-to-path';
import { Content, Identifier } from '../../../../external/confluence-api/types';

type ChildrenMacroProps = {
    parent?: string;
    content: Content;
};

export const ChildrenMacro = ({ parent, content }: ChildrenMacroProps) => {
    const [loading, setLoading] = useState(true);
    const [childPages, setChildPages]: any = useState<Identifier[]>([]);

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
