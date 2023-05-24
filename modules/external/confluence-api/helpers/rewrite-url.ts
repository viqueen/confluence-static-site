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
import { configuration } from '../../../configuration';

const isInternalUrl = (url: string): boolean => {
    return url.startsWith(`https://${configuration.CONFLUENCE_SITE_NAME}`);
};

const blogUrl =
    /https:\/\/[a-z.]+\/wiki\/spaces\/[a-z]+\/blog\/\d+\/\d+\/\d+\/(?<id>\d+)/;

const pageUrl = /https:\/\/[a-z.]+\/wiki\/spaces\/[a-z]+\/pages\/(?<id>\d+)/;

export const rewriteUrl = (url: string): string => {
    if (!isInternalUrl(url)) {
        return url;
    }
    const isBlog = url.match(blogUrl);
    if (isBlog) {
        return `${configuration.TARGET_SITE}/articles/${isBlog.groups?.id}/`;
    }
    const isPage = url.match(pageUrl);
    if (isPage) {
        return `${configuration.TARGET_SITE}/notes/${isPage.groups?.id}/`;
    }
    return url;
};
