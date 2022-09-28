import axios, { AxiosInstance } from 'axios';
import { configuration } from '../configuration';

class ConfluenceApi {
    private readonly client: AxiosInstance;
    constructor() {
        this.client = axios.create({
            baseURL: `https://${configuration.CONFLUENCE_SITE}`
        });
    }
}

const api = new ConfluenceApi();
export { api };
