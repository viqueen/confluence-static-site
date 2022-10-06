import React from 'react';
import { Content } from '../../../confluence-api/types';
import { configuration } from '../../../configuration';

export const StaticWrapper = (content: Content) => {
    const withCover = () => {
        if (!content.cover) return <></>;
        return (
            <meta
                name="twitter:image"
                content={`/attachments/${content.cover.fileId}`}
            />
        );
    };
    const withGoogleAnalytics = () => {
        if (!configuration.GOOGLE_ANALYTICS_TRACKING_ID) return <></>;
        return (
            <>
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${configuration.GOOGLE_ANALYTICS_TRACKING_ID}`}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${configuration.GOOGLE_ANALYTICS_TRACKING_ID}');
          `
                    }}
                />
            </>
        );
    };
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                <meta name="twitter:card" content="summary" />
                <meta
                    name="twitter:site"
                    content={configuration.TWITTER_SITE}
                />
                <meta name="twitter:title" content={content.identifier.title} />
                <meta name="twitter:description" content={content.excerpt} />
                {withCover()}
                <title>{content.identifier.title}</title>
                {withGoogleAnalytics()}
            </head>
            <body>
                <div id="root" />
            </body>
        </html>
    );
};
