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
import dotenv from 'dotenv';

interface Environment {
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
}

const parseEnv = (): Environment => {
    const parsed = (dotenv.config().parsed || {}) as unknown as Environment;
    return {
        CONFLUENCE_SITE_NAME:
            parsed.CONFLUENCE_SITE_NAME ?? process.env.CONFLUENCE_SITE_NAME,
        CONFLUENCE_USERNAME:
            parsed.CONFLUENCE_USERNAME ?? process.env.CONFLUENCE_USERNAME,
        CONFLUENCE_API_TOKEN:
            parsed.CONFLUENCE_API_TOKEN ?? process.env.CONFLUENCE_API_TOKEN,
        CONFLUENCE_CLOUD_TOKEN:
            parsed.CONFLUENCE_CLOUD_TOKEN ?? process.env.CONFLUENCE_CLOUD_TOKEN,
        TARGET_SITE: parsed.TARGET_SITE ?? process.env.TARGET_SITE,
        TWITTER_SITE: parsed.TWITTER_SITE ?? process.env.TWITTER_SITE,
        GOOGLE_ANALYTICS_TRACKING_ID:
            parsed.GOOGLE_ANALYTICS_TRACKING_ID ??
            process.env.GOOGLE_ANALYTICS_TRACKING_ID,
        OAUTH_CLIENT_ID: parsed.OAUTH_CLIENT_ID ?? process.env.OAUTH_CLIENT_ID,
        OAUTH_CLIENT_SECRET:
            parsed.OAUTH_CLIENT_SECRET ?? process.env.OAUTH_CLIENT_SECRET,
        CONFLUENCE_SITE_ID:
            parsed.CONFLUENCE_SITE_ID ?? process.env.CONFLUENCE_SITE_ID
    };
};

const environment = parseEnv();

export type { Environment };
export { environment };
