import axios, { AxiosInstance } from 'axios';
import {
    Attachment,
    AttachmentData,
    Content,
    Identifier,
    ResourceDefinition,
    ResourceObject
} from './types';
import * as crypto from 'crypto';
import { configuration } from '../../configuration';
import { axiosErrorHandler } from '../helpers';

class ConfluenceApi {
    private readonly client: AxiosInstance;
    constructor() {
        this.client = axios.create({
            baseURL: `https://${configuration.CONFLUENCE_SITE_NAME}`,
            auth: {
                username: configuration.CONFLUENCE_USERNAME,
                password: configuration.CONFLUENCE_API_TOKEN
            }
        });
    }

    async getSpaceHomepage(spaceKey: string): Promise<Identifier> {
        const { data } = await this.client
            .get(`/wiki/rest/api/space/${spaceKey}?expand=homepage`)
            .catch(axiosErrorHandler);
        const { homepage } = data;
        const { id, title } = homepage;
        return { id, title };
    }

    async getSpaceBlogs(spaceKey: string): Promise<Content[]> {
        const query = new URLSearchParams({
            cql: `space=${spaceKey} and type=blogpost order by created desc`,
            expand: 'content.history'
        });
        const { data } = await this.client
            .get(`/wiki/rest/api/search?${query.toString()}`)
            .catch(axiosErrorHandler);
        const { results } = data;
        return results.map((item: any) => {
            const { content, excerpt } = item;
            const { id, title, type, history } = content;
            const { createdBy, createdDate } = history;
            const createdAt = new Date(createdDate);
            return {
                identifier: { id, title },
                type,
                excerpt,
                author: {
                    id: createdBy.publicName,
                    title: createdBy.displayName
                },
                createdDate: createdAt.getTime(),
                createdYear: createdAt.getFullYear()
            };
        });
    }

    async getContentById(
        contentId: Pick<Identifier, 'id'>,
        asHomepage = false
    ): Promise<Content> {
        return this.getContentByCQL(`id=${contentId.id}`, asHomepage);
    }

    async getContentByCQL(cql: string, asHomepage = false): Promise<Content> {
        const contentExpansions = [
            'content.body.atlas_doc_format',
            'content.children.page.metadata.properties.emoji_title_published',
            'content.children.attachment.metadata.labels',
            'content.ancestors',
            'content.history',
            'content.metadata.properties.emoji_title_published'
        ];
        const query = new URLSearchParams({
            cql: cql,
            expand: contentExpansions.join(',')
        });
        const { data } = await this.client
            .get(`/wiki/rest/api/search?${query.toString()}`)
            .catch(axiosErrorHandler);
        const item = data.results[0]; // TODO: handle edge case
        const { content, excerpt, lastModified } = item;
        const {
            children,
            ancestors,
            id,
            title,
            type,
            body,
            history,
            metadata
        } = content;

        const { createdBy, createdDate } = history;
        const files = children.attachment?.results || [];

        const childPages =
            children.page?.results.map((child: any) => ({
                id: child.id,
                title: child.title,
                emoji: child.metadata.properties['emoji-title-published']?.value
            })) || [];
        const parentPages =
            ancestors?.map((parent: any) => ({
                id: parent.id,
                title: parent.title
            })) || [];
        const attachments = files.map(
            ({ extensions, _links, metadata: fileMetadata }: any) => ({
                fileId: extensions.fileId,
                downloadUrl: _links.download,
                mediaType: extensions.mediaType,
                isCover: fileMetadata.labels.results.some(
                    (i: any) => i.name === 'cover'
                )
            })
        );
        const author = {
            id: createdBy.publicName,
            title: createdBy.displayName,
            accountId: crypto
                .createHash('sha512')
                .update(createdBy.accountId)
                .digest('hex'),
            avatar: createdBy.profilePicture.path
        };

        const cover = attachments.find((a: Attachment) => a.isCover);
        const emoji = metadata.properties['emoji-title-published']?.value;

        const createdAt = new Date(createdDate);
        return {
            author,
            identifier: { id, title },
            asHomepage,
            excerpt,
            type,
            body: JSON.parse(body.atlas_doc_format.value),
            lastModifiedDate: new Date(lastModified).getTime(),
            createdDate: createdAt.getTime(),
            createdYear: createdAt.getFullYear(),
            childPages,
            parentPages,
            attachments,
            cover,
            emoji
        };
    }

    async getObjects(
        resourceUrls: Array<ResourceObject>
    ): Promise<Array<{ body: { data: ResourceDefinition } }>> {
        const { data } = await this.client
            .post('/gateway/api/object-resolver/resolve/batch', resourceUrls, {
                headers: {
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    cookie: `cloud.session.token=${configuration.CONFLUENCE_CLOUD_TOKEN}`
                }
            })
            .catch(axiosErrorHandler);
        return data;
    }

    async getAttachmentData(
        targetUrl: string,
        prefix: string = '/wiki'
    ): Promise<AttachmentData> {
        const { data } = await this.client
            .get(`${prefix}${targetUrl}`, {
                responseType: 'stream'
            })
            .catch(axiosErrorHandler);
        return { stream: data };
    }
}

const confluenceApi = new ConfluenceApi();
export { confluenceApi };
