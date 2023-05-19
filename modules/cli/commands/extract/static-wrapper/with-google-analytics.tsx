import React from 'react';

import { configuration } from '../../../../configuration';

export const withGoogleAnalytics = () => {
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
