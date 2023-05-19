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
            }[element] || element)
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
                <div className="blog-posts">
                    {articles.map((item: Content, index: number) => {
                        return <BlogPostItem content={item} key={index} />;
                    })}
                </div>
            )}
        </div>
    );
};
