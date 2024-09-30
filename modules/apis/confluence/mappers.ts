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
import crypto from 'crypto';

import { Content, SearchResultItem, BlogSummary } from './types';

const mapSearchResultItemToContent = (
    item: SearchResultItem,
    asHomepage = false
): Content => {
    const { content, excerpt, lastModified } = item;
    const { children, ancestors, id, title, type, body, history, metadata } =
        content;

    const { createdBy, createdDate } = history;
    const files = children.attachment?.results || [];

    const childPages =
        children.page?.results.map((child) => ({
            id: child.id,
            title: child.title,
            emoji: child.metadata.properties['emoji-title-published']?.value
        })) || [];

    const parentPages =
        ancestors.map((parent) => ({
            id: parent.id,
            title: parent.title
        })) || [];

    const attachments = files.map(({ extensions, _links }) => ({
        fileId: extensions.fileId,
        downloadUrl: _links.download,
        mediaType: extensions.mediaType
    }));
    const author = {
        id: createdBy.publicName,
        title: createdBy.displayName,
        accountId: crypto
            .createHash('sha512')
            .update(createdBy.accountId)
            .digest('hex'),
        avatar: createdBy.profilePicture.path
    };

    const emoji = metadata.properties['emoji-title-published']?.value;

    const createdAt = new Date(createdDate);

    const hasPdf = metadata.labels.results.some(
        (i) => i.name === 'export-to-pdf'
    );

    return {
        author,
        identifier: { id, title },
        asHomepage,
        excerpt,
        type,
        body: JSON.parse(body.atlas_doc_format.value),
        lastModifiedDate: new Date(lastModified).getTime(),
        createdDate: createdAt.getTime(),
        createdYear: createdAt.getFullYear(),
        childPages,
        parentPages,
        attachments,
        emoji,
        hasPdf
    };
};

const mapSearchResultItemToBlogSummary = (
    item: SearchResultItem
): BlogSummary => {
    const { content, excerpt } = item;
    const { id, title, type, history } = content;
    const { createdBy, createdDate } = history;
    const createdAt = new Date(createdDate);

    return {
        identifier: { id, title },
        type,
        excerpt,
        author: {
            id: createdBy.publicName,
            title: createdBy.displayName
        },
        createdDate: createdAt.getTime(),
        createdYear: createdAt.getFullYear()
    };
};

export { mapSearchResultItemToContent, mapSearchResultItemToBlogSummary };
