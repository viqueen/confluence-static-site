/**
 * Copyright 2024 Hasnae Rehioui
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
import type { AxiosInstance } from 'axios';

import { axiosErrorHandler } from '../axios-error-handler';

import { ContentSearchResponse } from './types';

interface ContentApiV1 {
    searchContent(
        query: Record<string, string>
    ): Promise<ContentSearchResponse>;
}

class ContentApiV1Impl implements ContentApiV1 {
    private readonly client: AxiosInstance;

    constructor(client: AxiosInstance) {
        this.client = client;
    }

    async searchContent(
        query: Record<string, string>
    ): Promise<ContentSearchResponse> {
        const { data } = await this.client
            .get<ContentSearchResponse>('/wiki/rest/api/content/search', {
                params: query
            })
            .catch(axiosErrorHandler);
        return data;
    }
}

const contentApiV1 = (client: AxiosInstance): ContentApiV1 =>
    new ContentApiV1Impl(client);

export { contentApiV1 };
export type { ContentApiV1 };
