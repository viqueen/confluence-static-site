export type Configuration = {
    CONFLUENCE_SITE: string;
    CONFLUENCE_USERNAME: string;
    CONFLUENCE_API_TOKEN: string;
    CONFLUENCE_CLOUD_TOKEN: string;

    TARGET_SITE: string;
    TWITTER_SITE: string;
    GA_TRACKING_ID: string;
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
