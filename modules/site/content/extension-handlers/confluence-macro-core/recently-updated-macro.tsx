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

import PageIcon from '@atlaskit/icon/glyph/page';
import Spinner from '@atlaskit/spinner';
import axios from 'axios';

import { Identifier } from '../../../../apis';
import { titleToPath } from '../../../../shared';

import './recently-updated-macro.css';

interface RecentlyUpdatedMacroProps {
    max: number;
}

interface RecentlyUpdated {
    homepage: Identifier;
    notes: Identifier[];
}

const RecentlyUpdatedItem = ({
    item,
    homepage
}: {
    item: Identifier;
    homepage?: Identifier;
}) => {
    const href =
        item.id === homepage?.id ? `/` : `/notes/${titleToPath(item.title)}/`;
    return (
        <div className="recently-updated-item" key={item.id}>
            <PageIcon label="page" size="small" />
            <a href={href}>{item.title}</a>
        </div>
    );
};

const RecentlyUpdatedMacro = ({ max }: RecentlyUpdatedMacroProps) => {
    const [loading, setLoading] = useState(true);
    const [recentlyUpdated, setRecentlyUpdated] = useState<
        RecentlyUpdated | undefined
    >();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get(`/recently-updated.json`);
            return data;
        };
        fetchData()
            .then((data) => {
                const { homepage, notes } = data;
                setRecentlyUpdated({ homepage, notes: notes.slice(0, max) });
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    return (
        <div>
            {loading && <Spinner size="medium" />}
            {!loading && recentlyUpdated && (
                <div>
                    <h2>recently updated</h2>
                    <div className="recently-updated">
                        {recentlyUpdated.notes.map((item, index) => (
                            <RecentlyUpdatedItem
                                item={item}
                                homepage={recentlyUpdated?.homepage}
                                key={`recently-updated-${index}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export { RecentlyUpdatedMacro };
