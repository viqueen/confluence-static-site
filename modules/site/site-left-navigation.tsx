import React, { useEffect, useState } from 'react';
import {
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
import axios from 'axios';
import Spinner from '@atlaskit/spinner';

type NavigationItem = {
    href: string;
    title: string;
    emoji?: string;
};

type Navigation = {
    notes: NavigationItem[];
    articles: NavigationItem[];
};

const resolveStack = () => {
    const pathName = window.location.pathname;
    if (pathName.startsWith('/notes')) return ['notes'];
    if (pathName.startsWith('/articles')) return ['articles'];
    return [];
};

const NavigationLinkItem = (props: { item: NavigationItem }) => {
    const { item } = props;
    const iconBefore = item.emoji ? (
        <img src={`/assets/emojis/${item.emoji}.png`} height={18} width={18} />
    ) : null;
    return (
        <LinkItem iconBefore={iconBefore} href={item.href}>
            {item.title}
        </LinkItem>
    );
};

export const SiteLeftNavigation = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [navigation, setNavigation] = useState<Navigation>({
        notes: [],
        articles: []
    });
    const [stack] = useState<string[]>(resolveStack());

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
            <NestableNavigationContent initialStack={stack}>
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
                                navigation.notes.map((item) => (
                                    <NavigationLinkItem item={item} />
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
                                navigation.articles.map((item) => (
                                    <NavigationLinkItem item={item} />
                                ))}
                        </Section>
                    </NestingItem>
                </Section>
            </NestableNavigationContent>
        </SideNavigation>
    );
};
