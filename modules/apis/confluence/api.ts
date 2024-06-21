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

import type { AxiosInstance } from 'axios';

import { environment } from '../../cli/conf';
import { configuration } from '../../configuration';
import { axiosErrorHandler } from '../axios-error-handler';

import { searchResultItemMapper } from './mappers';
import {
    AttachmentData,
    Content,
    Identifier,
    ResourceDefinition,
    ResourceObject,
    SearchResult
} from './types';

interface ConfluenceApi {
    getSpaceHomepage(spaceKey: string): Promise<Identifier>;
    getSpaceBlogs(spaceKey: string): Promise<Content[]>;
    getSpaceRecentlyUpdatedPages(spaceKey: string): Promise<Identifier[]>;
    getContentById(
        contentId: Pick<Identifier, 'id'>,
        asHomepage: boolean
    ): Promise<Content>;
    getContentByCQL(cql: string, asHomepage: boolean): Promise<Content>;
    getObjects(
        resourceUrls: ResourceObject[]
    ): Promise<{ body: { data: ResourceDefinition } }[]>;
    getAttachmentData(
        targetUrl: string,
        prefix: string
    ): Promise<AttachmentData>;
}

const confluenceApi = (client: AxiosInstance): ConfluenceApi => {
    const getSpaceHomepage = async (spaceKey: string): Promise<Identifier> => {
        const { data } = await client
            .get(`/wiki/rest/api/space/${spaceKey}?expand=homepage`)
            .catch(axiosErrorHandler);
        const { homepage } = data;
        const { id, title } = homepage;
        return { id, title };
    };

    const getSpaceBlogs = async (_spaceKey: string): Promise<Content[]> => {
        throw new Error('Not implemented');
    };

    const getSpaceRecentlyUpdatedPages = async (
        _spaceKey: string
    ): Promise<Identifier[]> => {
        throw new Error('Not implemented');
    };

    const getContentById = async (
        contentId: Pick<Identifier, 'id'>,
        asHomepage: boolean
    ): Promise<Content> => {
        return getContentByCQL(`id=${contentId.id}`, asHomepage);
    };

    const getContentByCQL = async (
        cql: string,
        asHomepage: boolean = false
    ): Promise<Content> => {
        const contentExpansions = [
            'content.body.atlas_doc_format',
            'content.children.page.metadata.properties.emoji_title_published',
            'content.children.attachment.metadata.labels',
            'content.ancestors',
            'content.history',
            'content.metadata.properties.emoji_title_published',
            'content.metadata.labels'
        ];
        const query = new URLSearchParams({
            cql: cql,
            expand: contentExpansions.join(',')
        });
        const { data } = await client
            .get<SearchResult>(`/wiki/rest/api/search?${query.toString()}`)
            .catch(axiosErrorHandler);
        const item = data.results[0];
        return searchResultItemMapper(item, asHomepage);
    };

    const getObjects = async (
        resourceUrls: ResourceObject[]
    ): Promise<{ body: { data: ResourceDefinition } }[]> => {
        const { data } = await client
            .post('/gateway/api/object-resolver/resolve/batch', resourceUrls, {
                headers: {
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    cookie: `cloud.session.token=${environment.CONFLUENCE_CLOUD_TOKEN}`
                }
            })
            .catch(axiosErrorHandler);
        return data;
    };

    const getAttachmentData = async (
        targetUrl: string,
        prefix: string
    ): Promise<AttachmentData> => {
        const { data } = await client
            .get(`${prefix}${targetUrl}`, {
                responseType: 'stream'
            })
            .catch(axiosErrorHandler);
        return { stream: data };
    };

    return {
        getSpaceHomepage,
        getSpaceBlogs,
        getSpaceRecentlyUpdatedPages,
        getContentById,
        getContentByCQL,
        getObjects,
        getAttachmentData
    };
};

export type { ConfluenceApi };
export { confluenceApi };
