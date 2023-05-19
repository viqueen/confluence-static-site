import Page, { Grid, GridColumn } from '@atlaskit/page';
import Spinner from '@atlaskit/spinner';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { Content } from '../external/confluence-api/types';

import { ContentAncestors } from './content/content-ancestors';
import { ContentByLine } from './content/content-byline';
import { ContentCover } from './content/content-cover';
import { ContentHeader } from './content/content-header';
import { ContentRenderer } from './content/content-renderer';
import './site-content.css';
import { siteProperties } from './site-properties';

export const SiteContent = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [content, setContent] = useState<Content | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get('data.json');
            return data;
        };
        fetchData().then((data) => {
            document.title = `${siteProperties.name} - ${data.identifier.title}`;
            setContent(data);
            setLoading(false);
        });
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
                    <Grid layout="fluid">
                        <ContentCover content={content} />
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
