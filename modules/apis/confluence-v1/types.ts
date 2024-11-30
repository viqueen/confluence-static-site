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

interface ContentSearchResponse {
    results: ContentItem[];
    start: number;
    limit: number;
    size: number;
}

interface ContentItem {
    id: string;
    type: 'folder' | 'page';
    metadata?: ContentItemMetadata;
}

interface ContentItemMetadata {
    properties?: ContentItemProperties;
}

interface ContentItemProperties {
    'content-state-published': {
        value: string;
    };
    'cover-picture-id-published': {
        value: string;
    };
    'emoji-title-published': {
        value: string;
    };
}

export type { ContentSearchResponse, ContentItem };
