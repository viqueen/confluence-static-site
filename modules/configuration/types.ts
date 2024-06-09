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
import type { GenerateThemeArgs } from '@atlaskit/atlassian-navigation';

export type Configuration = {
    CONFLUENCE_SITE_NAME: string;
    CONFLUENCE_SITE_ID?: string;
    CONFLUENCE_USERNAME: string;
    CONFLUENCE_API_TOKEN: string;
    CONFLUENCE_CLOUD_TOKEN: string;

    TARGET_SITE: string;
    TWITTER_SITE: string;
    GOOGLE_ANALYTICS_TRACKING_ID: string;

    OAUTH_CLIENT_ID: string;
    OAUTH_CLIENT_SECRET: string;
};

export type Output = {
    assets: { avatars: string; emojis: string };
    attachments: string;
    pages: string;
    blogs: string;
    home: string;
    objectResolver: string;
    templates: string;
};

export type SiteProperties = {
    title: string;
    iconUrl: string;
    name: string;
    theme: GenerateThemeArgs;
};
