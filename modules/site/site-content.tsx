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

import { Grid, GridColumn } from '@atlaskit/page';
import Spinner from '@atlaskit/spinner';
import axios from 'axios';

import { Content } from '../apis';

import { ContentAncestors } from './content/content-ancestors';
import { ContentByLine } from './content/content-byline';
import { ContentCover } from './content/content-cover';
import { ContentHeader } from './content/content-header';
import { ContentRenderer } from './content/content-renderer';
import { siteProperties } from './site-properties';

import './site-content.css';

export const SiteContent = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [content, setContent] = useState<Content | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get('data.json');
            return data;
        };
        fetchData()
            .then((data) => {
                document.title = `${siteProperties.name} - ${data.identifier.title}`;
                setContent(data);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    return (
        <>
            {loading && (
                <div style={{ margin: 60 }}>
                    <Spinner size="large" />
                </div>
            )}
            {!loading && content && (
                <div className="site-content">
                    {content.asHomepage && <div className="homepage" />}
                    <ContentAncestors content={content} />
                    <ContentCover content={content} />
                    <Grid layout="fixed">
                        <GridColumn medium={12}>
                            <ContentHeader content={content} />
                        </GridColumn>
                        <GridColumn medium={12}>
                            <ContentByLine content={content} />
                            <ContentRenderer content={content} />
                        </GridColumn>
                    </Grid>
                </div>
            )}
        </>
    );
};
