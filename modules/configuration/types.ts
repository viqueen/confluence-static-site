export type Configuration = {
    CONFLUENCE_SITE: string;
    CONFLUENCE_USERNAME: string;
    CONFLUENCE_API_TOKEN: string;
    CONFLUENCE_CLOUD_TOKEN: string;

    TARGET_SITE: string;
};

export type Output = {
    assets: { avatars: string };
    attachments: string;
    pages: string;
    blogs: string;
    home: string;
    objectResolver: string;
};
