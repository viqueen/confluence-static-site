import React, { useEffect, useState } from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import Spinner from '@atlaskit/spinner';
import { Content } from '../confluence-api/types';
import axios from 'axios';
import { ContentRenderer } from './content/content-renderer';

export const MainContent = () => {
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState<Content | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get('data.json');
            return data;
        };
        fetchData().then((data) => {
            document.title = `${data.identifier.title}`;
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
                <div
                    style={{
                        overflowY: 'auto',
                        height: '90vh',
                        padding: '2em',
                        width: '100%'
                    }}
                >
                    <Page>
                        <Grid layout="fixed">
                            <GridColumn medium={12}>
                                <ContentRenderer content={content} />
                            </GridColumn>
                        </Grid>
                    </Page>
                </div>
            )}
        </>
    );
};
