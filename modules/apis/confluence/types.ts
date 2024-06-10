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
interface Identifier {
    id: string;
    title: string;
}

interface Attachment {
    fileId: string;
    downloadUrl: string;
    mediaType: string;
    isCover: boolean;
}

interface AttachmentData {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stream: any;
}

interface Content {
    identifier: Identifier;
    type: 'page' | 'blogpost';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any;
    excerpt: string;
    asHomepage: boolean;
    hasPdf: boolean;

    author: Identifier & { avatar: string; accountId: string };
    lastModifiedDate: number;
    createdDate: number;
    createdYear: number;

    parentPages?: Identifier[];
    childPages?: (Identifier & { emoji?: string })[];
    attachments?: Attachment[];
    cover?: Attachment;
    emoji?: string;
}

interface ResourceObject {
    resourceUrl: string;
}

interface ResourceDefinition {
    url: string;
    generator: { icon: { url: string } };
    name: string;
    '@type': string;
}

export type {
    Identifier,
    Attachment,
    AttachmentData,
    Content,
    ResourceObject,
    ResourceDefinition
};
