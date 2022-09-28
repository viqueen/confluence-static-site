import axios, { AxiosInstance } from 'axios';
import { configuration } from '../configuration';
import { Identifier } from './types';

class ConfluenceApi {
    private readonly client: AxiosInstance;
    constructor() {
        this.client = axios.create({
            baseURL: `https://${configuration.CONFLUENCE_SITE}`
        });
    }

    async getSpaceHomepage(spaceKey: string): Promise<Identifier> {
        const result = await this.client.get(
            `/wiki/rest/api/space/${spaceKey}?expand=homepage`
        );
        const { homepage } = result.data;
        const { id, title } = homepage;
        return { id, title };
    }
}

const api = new ConfluenceApi();
export { api };
