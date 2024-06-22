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

import BookIcon from '@atlaskit/icon/glyph/book';
import PageIcon from '@atlaskit/icon/glyph/page';
import QueueIcon from '@atlaskit/icon/glyph/queues';
import QuoteIcon from '@atlaskit/icon/glyph/quote';
import Story24Icon from '@atlaskit/icon-object/glyph/story/24';
import {
    Header,
    LinkItem,
    NavigationHeader,
    NestableNavigationContent,
    NestingItem,
    Section,
    SideNavigation
} from '@atlaskit/side-navigation';
import Spinner from '@atlaskit/spinner';
import axios from 'axios';

import { siteProperties } from './site-properties';

type NavigationItem = {
    href: string;
    title: string;
    emoji?: string;
};

type Navigation = {
    notes: NavigationItem[];
    articles: Record<number, NavigationItem[]>;
};

const resolveStack = () => {
    const pathName = window.location.pathname;
    if (pathName.startsWith('/notes')) return ['notes'];
    if (pathName.startsWith('/articles')) return ['articles'];
    return [];
};

const resolveIcon = (props: {
    item: NavigationItem;
    type: 'blogpost' | 'page';
}) => {
    const { item, type } = props;
    if (item.emoji) {
        return (
            <img
                src={`/assets/emojis/${item.emoji}.png`}
                height={18}
                width={18}
                alt="content"
            />
        );
    }
    if (type === 'page') {
        return <PageIcon label="content" />;
    }
    return <BookIcon label="content" />;
};

const NavigationLinkItem = (props: {
    item: NavigationItem;
    type: 'blogpost' | 'page';
}) => {
    const { item, type } = props;
    const iconBefore = resolveIcon({ item, type });
    return (
        <LinkItem iconBefore={iconBefore} href={item.href}>
            {item.title}
        </LinkItem>
    );
};

const ArticlesByYear = (props: {
    createdYear: string;
    items: NavigationItem[];
}) => {
    return (
        <Section title={props.createdYear}>
            {props.items.map((item, index) => (
                <NavigationLinkItem
                    item={item}
                    key={`article-${props.createdYear}-${index}`}
                    type="blogpost"
                />
            ))}
        </Section>
    );
};

export const SiteLeftNavigation = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [navigation, setNavigation] = useState<Navigation>({
        notes: [],
        articles: {}
    });
    const [stack] = useState<string[]>(resolveStack());

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get('/navigation.json');
            return data;
        };
        fetchData()
            .then((data) => {
                setNavigation(data);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    return (
        <SideNavigation label="Site Navigation">
            <NavigationHeader>
                <Header
                    iconBefore={<Story24Icon label={siteProperties.title} />}
                >
                    {siteProperties.name}
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
                                navigation.notes.map((item, index) => (
                                    <NavigationLinkItem
                                        item={item}
                                        key={index}
                                        type="page"
                                    />
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
                                Object.entries(navigation.articles)
                                    .sort(([a], [b]) => b.localeCompare(a))
                                    .map(([createdYear, items], index) => (
                                        <ArticlesByYear
                                            createdYear={createdYear}
                                            items={items}
                                            key={index}
                                        />
                                    ))}
                        </Section>
                    </NestingItem>
                </Section>
            </NestableNavigationContent>
        </SideNavigation>
    );
};
