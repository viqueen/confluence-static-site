import React from 'react';
import { Content } from '../../../../external/confluence-api/types';
import { configuration } from '../../../../configuration';

export const withOpenGraphSeo = (content: Content) => {
    const withImage = () => {
        if (!content.cover) return <></>;
        return (
            <>
                <meta
                    name="og:image"
                    content={`${configuration.TARGET_SITE}/attachments/${content.cover.fileId}`}
                />
                <meta
                    property="og:image"
                    content={`${configuration.TARGET_SITE}/attachments/${content.cover.fileId}`}
                />
            </>
        );
    };
    return (
        <>
            <meta name="og:title" content={content.identifier.title} />
            <meta property="og:title" content={content.identifier.title} />
            <meta name="og:description" content={content.excerpt} />
            <meta property="og:description" content={content.excerpt} />
            <meta name="og:site" content={configuration.TWITTER_SITE} />
            <meta property="og:site" content={configuration.TWITTER_SITE} />
            <meta name="og:url" content={configuration.TARGET_SITE} />
            <meta property="og:url" content={configuration.TARGET_SITE} />
            {withImage()}
        </>
    );
};
