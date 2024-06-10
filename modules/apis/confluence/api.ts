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

import {
    AttachmentData,
    Content,
    Identifier,
    ResourceDefinition,
    ResourceObject
} from './types';

interface ConfluenceApi {
    getSpaceHomepage(spaceKey: string): Promise<Identifier>;
    getSpaceBlogs(spaceKey: string): Promise<Content[]>;
    getSpaceRecentlyUpdatedPages(spaceKey: string): Promise<Identifier[]>;
    getContentById(contentId: string, asHomepage: boolean): Promise<Content>;
    getContentByCQL(cql: string, asHomepage: boolean): Promise<Content>;
    getObjects(
        resourceUrls: ResourceObject[]
    ): Promise<{ body: { data: ResourceDefinition } }[]>;
    getAttachmentData(
        targetUrl: string,
        prefix: string
    ): Promise<AttachmentData>;
}

const confluenceApi = (_client: AxiosInstance): ConfluenceApi => {
    const getSpaceHomepage = async (_spaceKey: string): Promise<Identifier> => {
        throw new Error('Not implemented');
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
        _contentId: string,
        _asHomepage: boolean
    ): Promise<Content> => {
        throw new Error('Not implemented');
    };

    const getContentByCQL = async (
        _cql: string,
        _asHomepage: boolean
    ): Promise<Content> => {
        throw new Error('Not implemented');
    };

    const getObjects = async (
        _resourceUrls: ResourceObject[]
    ): Promise<{ body: { data: ResourceDefinition } }[]> => {
        throw new Error('Not implemented');
    };

    const getAttachmentData = async (
        _targetUrl: string,
        _prefix: string
    ): Promise<AttachmentData> => {
        throw new Error('Not implemented');
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
