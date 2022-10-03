import { GenerateThemeArgs } from '@atlaskit/atlassian-navigation';

export type Configuration = {
    CONFLUENCE_SITE_NAME: string;
    CONFLUENCE_SITE_ID: string;
    CONFLUENCE_USERNAME: string;
    CONFLUENCE_API_TOKEN: string;
    CONFLUENCE_CLOUD_TOKEN: string;

    TARGET_SITE: string;
    TWITTER_SITE: string;
    GA_TRACKING_ID: string;

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
