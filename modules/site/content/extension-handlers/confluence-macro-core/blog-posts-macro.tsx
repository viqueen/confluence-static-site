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

import Avatar from '@atlaskit/avatar';
import { Date } from '@atlaskit/date';
import Spinner from '@atlaskit/spinner';
import { colorPalette } from '@atlaskit/theme/color-palettes';
import axios from 'axios';

import { titleToPath } from '../../../../external/confluence-api/helpers/title-to-path';
import { Content } from '../../../../external/confluence-api/types';

import './blog-posts-macro.css';

const unescapeExcerpt = (excerpt: string) => {
    return excerpt.replace(
        /&amp;|&#39;|&quot;/g,
        (element) =>
            ({
                '&amp;': '&',
                '&#39;': "'",
                '&quot;': '"'
            })[element] || element
    );
};

const BlogPostItemCover = ({ content }: { content: Content }) => {
    if (!content.cover) {
        return <div className="blog-post-item-default-cover"></div>;
    }
    const { fileId } = content.cover;
    return (
        <img
            src={`/attachments/${fileId}-thumbnail`}
            className="blog-post-item-cover"
        />
    );
};

const BlogPostItem = ({ content }: { content: Content }) => {
    return (
        <div className="blog-post-item">
            <BlogPostItemCover content={content} />
            <div className="blog-post-item-content">
                <a href={`/articles/${titleToPath(content.identifier.title)}/`}>
                    {content.identifier.title}
                </a>
                <div className="excerpt">
                    {unescapeExcerpt(content.excerpt)}
                </div>
                <div className="by-line">
                    <Avatar
                        appearance="circle"
                        src={`/assets/avatars/${content.author.id}-avatar`}
                    />
                    <div
                        style={{
                            color: colorPalette('24')[16].background,
                            display: 'inline-block',
                            marginLeft: 5
                        }}
                    >
                        <div>{content.author.title}</div>
                        <div style={{ display: 'inline-block' }}>
                            on{' '}
                            <Date
                                value={content.createdDate}
                                color="blue"
                                format="MMMM do y"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const BlogPostsMacro = () => {
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [articles, setArticles]: any = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get(`/blogs.json`);
            return data;
        };
        fetchData()
            .then((data) => {
                setArticles(data);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    return (
        <div>
            {loading && <Spinner size="large" />}
            {!loading && articles.length > 0 && (
                <div className="blog-posts">
                    {articles.map((item: Content, index: number) => {
                        return <BlogPostItem content={item} key={index} />;
                    })}
                </div>
            )}
        </div>
    );
};
