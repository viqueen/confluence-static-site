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
import * as fs from 'fs';
import * as path from 'path';

import { traverse } from '@atlaskit/adf-utils/traverse';
import type { ADFEntity } from '@atlaskit/adf-utils/types';
import axios from 'axios';
import type { AxiosInstance } from 'axios';

import { Content } from '../../../apis';
import { confluence } from '../../clients';
import { Output } from '../../conf';

const extractAvatars = async (content: Content, output: Output) => {
    const { author } = content;
    const avatarFile = path.resolve(
        output.assets.avatars,
        `${author.id}-avatar`
    );
    if (fs.existsSync(avatarFile)) return;

    const { stream } = await confluence.getAttachmentData(author.avatar, '');
    const file = fs.createWriteStream(avatarFile);
    stream.pipe(file);

    const symlink = path.resolve(output.assets.avatars, author.accountId);
    if (fs.existsSync(symlink)) return;
    fs.symlinkSync(avatarFile, symlink);
};

const UUID_REGEX =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

const fetchEmoji = async (
    client: AxiosInstance,
    id: string,
    output: Output
) => {
    const targetFile = path.resolve(output.assets.emojis, `${id}.png`);
    if (fs.existsSync(targetFile)) return;
    if (RegExp(UUID_REGEX).exec(id)) return;

    const targetUrl = id.startsWith('atlassian')
        ? `/atlassian/${id.split('-')[1]}_64.png`
        : `/standard/caa27a19-fc09-4452-b2b4-a301552fd69c/64x64/${id}.png`;

    return client
        .get(`${targetUrl}`, { responseType: 'stream' })
        .then((response) => ({ stream: response.data }))
        .then(({ stream }) => {
            const file = fs.createWriteStream(targetFile);
            return stream.pipe(file);
        });
};

const extractEmojis = async (content: Content, output: Output) => {
    const client = axios.create({
        baseURL:
            'https://pf-emoji-service--cdn.us-east-1.prod.public.atl-paas.net'
    });

    if (content.emoji) await fetchEmoji(client, content.emoji, output);

    traverse(content.body, {
        emoji: (node: ADFEntity) => {
            if (!node.attrs) return;
            fetchEmoji(client, node.attrs.id, output);
        }
    });
};

export const extractAssets = async (content: Content, output: Output) => {
    await extractAvatars(content, output);
    await extractEmojis(content, output);
};
