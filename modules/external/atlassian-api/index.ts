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
import axios from 'axios';
import type { AxiosInstance } from 'axios';

import { cliOauthClient } from '../../cli-oauth-client';
import { axiosErrorHandler } from '../helpers';

export interface AccessibleResource {
    id: string;
    name: string;
}

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
            .get<AccessibleResource[]>(`/oauth/token/accessible-resources`)
            .catch(axiosErrorHandler);
    }
}

export const atlassianApi = async () => {
    const token = await cliOauthClient.accessToken();
    if (!token) throw Error(`could not create api client`);
    return new AtlassianApi(token);
};
