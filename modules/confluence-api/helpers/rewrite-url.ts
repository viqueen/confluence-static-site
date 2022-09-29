import { configuration } from '../../configuration';

const isInternalUrl = (url: string): boolean => {
    return url.startsWith(`https://${configuration.CONFLUENCE_SITE}`);
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
