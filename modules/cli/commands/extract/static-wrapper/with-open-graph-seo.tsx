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

import { Content } from '../../../../apis';
import { environment } from '../../../conf';

export const withOpenGraphSeo = (content: Content) => {
    const withImage = () => {
        if (!content.coverUrl) return <></>;
        return (
            <>
                <meta name="og:image" content={content.coverUrl} />
                <meta property="og:image" content={content.coverUrl} />
            </>
        );
    };
    return (
        <>
            <meta name="og:title" content={content.identifier.title} />
            <meta property="og:title" content={content.identifier.title} />
            <meta name="og:description" content={content.excerpt} />
            <meta property="og:description" content={content.excerpt} />
            <meta name="og:site" content={environment.TWITTER_SITE} />
            <meta property="og:site" content={environment.TWITTER_SITE} />
            <meta name="og:url" content={environment.TARGET_SITE} />
            <meta property="og:url" content={environment.TARGET_SITE} />
            {withImage()}
        </>
    );
};
