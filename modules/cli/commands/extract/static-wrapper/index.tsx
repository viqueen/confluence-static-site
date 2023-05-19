import React from 'react';

import { Content } from '../../../../external/confluence-api/types';

import { withGoogleAnalytics } from './with-google-analytics';
import { withOpenGraphSeo } from './with-open-graph-seo';
import { withTwitterSeo } from './with-twitter-seo';

export const StaticWrapper = (content: Content) => {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                {withTwitterSeo(content)}
                {withOpenGraphSeo(content)}
                {withGoogleAnalytics()}
                <title>{content.identifier.title}</title>
            </head>
            <body>
                <div id="root" />
            </body>
        </html>
    );
};
