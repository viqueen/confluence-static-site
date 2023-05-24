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
import React from 'react';

import { configuration } from '../../../../configuration';
import { Content } from '../../../../external/confluence-api/types';

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
