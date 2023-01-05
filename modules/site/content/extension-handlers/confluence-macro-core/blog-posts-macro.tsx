import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '@atlaskit/spinner';
import { Content } from '../../../../external/confluence-api/types';
import { titleToPath } from '../../../../external/confluence-api/helpers/title-to-path';

import './blog-posts-macro.css';
import Avatar from '@atlaskit/avatar';
import { colorPalette } from '@atlaskit/theme/color-palettes';
import { Date } from '@atlaskit/date';

const unescapeExcerpt = (excerpt: string) => {
    return excerpt.replace(
        /&amp;|&#39;|&quot;/g,
        (element) =>
            ({
                '&amp;': '&',
                '&#39;': "'",
                '&quot;': '"'
            }[element] || element)
    );
};

const BlogPostItem = ({ content }: { content: Content }) => {
    return (
        <div className="blog-post-item">
            <a href={`/articles/${titleToPath(content.identifier.title)}/`}>
                {content.identifier.title}
            </a>
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
                <div>by {content.author.title}</div>
                <div style={{ display: 'inline-block' }}>
                    on{' '}
                    <Date
                        value={content.createdDate}
                        color="blue"
                        format="MMMM do y"
                    />
                </div>
            </div>
            <div style={{ marginTop: 20 }}>
                {unescapeExcerpt(content.excerpt)}
            </div>
            <hr />
        </div>
    );
};

export const BlogPostsMacro = () => {
    const [loading, setLoading] = useState(true);
    const [articles, setArticles]: any = useState({});

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data } = await axios.get(`/blogs.json`);
            return data;
        };
        fetchData().then((data) => {
            setArticles(data);
            setLoading(false);
        });
    }, []);

    return (
        <div>
            {loading && <Spinner size="large" />}
            {!loading && articles.length > 0 && (
                <div>
                    {articles.map((item: Content, index: number) => {
                        return <BlogPostItem content={item} key={index} />;
                    })}
                </div>
            )}
        </div>
    );
};
