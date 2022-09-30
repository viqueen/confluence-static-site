import React, { useEffect, useState } from 'react';
import {
    ButtonItem,
    Header,
    LinkItem,
    NavigationHeader,
    NestableNavigationContent,
    NestingItem,
    Section,
    SideNavigation
} from '@atlaskit/side-navigation';
import QueueIcon from '@atlaskit/icon/glyph/queues';
import QuoteIcon from '@atlaskit/icon/glyph/quote';
import { siteProperties } from './site-properties';
import Story24Icon from '@atlaskit/icon-object/glyph/story/24';
import { Content } from '../confluence-api/types';
import axios from 'axios';
import Spinner from '@atlaskit/spinner';
import { titleToPath } from '../confluence-api/helpers/title-to-path';

type NavigationItem = {
    href: string;
    title: string;
};

type Navigation = {
    notes: NavigationItem[];
    articles: NavigationItem[];
};

export const SiteLeftNavigation = () => {
    const [loading, setLoading] = useState(true);
    const [navigation, setNavigation] = useState<Navigation | undefined>(
        undefined
    );

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get('/navigation.json');
            return data;
        };
        fetchData().then((data) => {
            setNavigation(data);
            setLoading(false);
        });
    }, []);

    return (
        <SideNavigation label="Site Navigation">
            <NavigationHeader>
                <Header
                    iconBefore={<Story24Icon label={siteProperties.title} />}
                >
                    {siteProperties.prefix}
                </Header>
            </NavigationHeader>
            <NestableNavigationContent>
                <Section>
                    <NestingItem
                        id="notes"
                        title="Notes"
                        iconBefore={<QueueIcon size="large" label="Notes" />}
                    >
                        <Section title="Notes">
                            {loading && <Spinner size="medium" />}
                            {!loading &&
                                navigation &&
                                navigation.notes.map(({ title, href }) => (
                                    <LinkItem href={href}>{title}</LinkItem>
                                ))}
                        </Section>
                    </NestingItem>
                    <NestingItem
                        id="articles"
                        title="Articles"
                        iconBefore={<QuoteIcon size="large" label="Articles" />}
                    >
                        <Section title="Articles">
                            {loading && <Spinner size="medium" />}
                            {!loading &&
                                navigation &&
                                navigation.articles.map(({ title, href }) => (
                                    <LinkItem href={href}>{title}</LinkItem>
                                ))}
                        </Section>
                    </NestingItem>
                </Section>
            </NestableNavigationContent>
        </SideNavigation>
    );
};
