import axios, { AxiosInstance } from 'axios';
import { configuration } from '../configuration';
import { Content, Identifier } from './types';

const identifier = (item: any): Identifier => ({
    id: item.id,
    title: item.title
});

class ConfluenceApi {
    private readonly client: AxiosInstance;
    constructor() {
        this.client = axios.create({
            baseURL: `https://${configuration.CONFLUENCE_SITE}`,
            auth: {
                username: configuration.CONFLUENCE_USERNAME,
                password: configuration.CONFLUENCE_API_TOKEN
            }
        });
    }

    async getSpaceHomepage(spaceKey: string): Promise<Identifier> {
        const { data } = await this.client.get(
            `/wiki/rest/api/space/${spaceKey}?expand=homepage`
        );
        const { homepage } = data;
        const { id, title } = homepage;
        return { id, title };
    }

    async getSpaceBlogs(spaceKey: string): Promise<Content[]> {
        const query = new URLSearchParams({
            cql: `space=${spaceKey} and type=blogpost order by created desc`,
            expand: 'content.history'
        });
        const { data } = await this.client.get(
            `/wiki/rest/api/search?${query.toString()}`
        );
        const { results } = data;
        return results.map((item: any) => {
            const { content } = item;
            const { id, title, type } = content;
            return {
                identifier: { id, title },
                type
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
            'content.children.page',
            'content.children.attachment.metadata.labels',
            'content.ancestors',
            'content.history'
        ];
        const query = new URLSearchParams({
            cql: cql,
            expand: contentExpansions.join(',')
        });
        const { data } = await this.client.get(
            `/wiki/rest/api/search?${query.toString()}`
        );
        const item = data.results[0]; // TODO: handle edge case
        const { content } = item;
        const { children, id, title, type } = content;

        const childPages = children.page?.results || [];

        return {
            identifier: { id, title },
            type,
            children: childPages.map(identifier)
        };
    }
}

const api = new ConfluenceApi();
export { api };
