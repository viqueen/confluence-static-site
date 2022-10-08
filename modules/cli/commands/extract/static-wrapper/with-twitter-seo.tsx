import React from 'react';
import { Content } from '../../../../confluence-api/types';
import { configuration } from '../../../../configuration';

export const withTwitterSeo = (content: Content) => {
    const withImage = () => {
        if (!content.cover) return <></>;
        return (
            <>
                <meta
                    name="twitter:image:src"
                    content={`${configuration.TARGET_SITE}/attachments/${content.cover.fileId}`}
                />
                <meta
                    property="twitter:image:src"
                    content={`${configuration.TARGET_SITE}/attachments/${content.cover.fileId}`}
                />
            </>
        );
    };
    return (
        <>
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={content.identifier.title} />
            <meta property="twitter:title" content={content.identifier.title} />
            <meta name="twitter:description" content={content.excerpt} />
            <meta property="twitter:description" content={content.excerpt} />
            <meta name="twitter:site" content={configuration.TWITTER_SITE} />
            <meta
                property="twitter:site"
                content={configuration.TWITTER_SITE}
            />
            <meta name="twitter:creator" content={configuration.TWITTER_SITE} />
            <meta
                property="twitter:creator"
                content={configuration.TWITTER_SITE}
            />
            <meta name="twitter:url" content={configuration.TARGET_SITE} />
            <meta property="twitter:url" content={configuration.TARGET_SITE} />
            {withImage()}
        </>
    );
};
