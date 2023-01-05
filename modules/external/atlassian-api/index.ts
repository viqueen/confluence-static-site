import axios, { AxiosInstance } from 'axios';
import { cliOauthClient } from '../../cli-oauth-client';
import { axiosErrorHandler } from '../helpers';

class AtlassianApi {
    private readonly client: AxiosInstance;

    constructor(token: string) {
        this.client = axios.create({
            baseURL: `https://api.atlassian.com`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    async accessibleResources() {
        return this.client
            .get(`/oauth/token/accessible-resources`)
            .catch(axiosErrorHandler);
    }
}

export const atlassianApi = async () => {
    const token = await cliOauthClient.accessToken();
    if (!token) throw Error(`could not create api client`);
    return new AtlassianApi(token);
};
