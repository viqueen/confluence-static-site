import * as path from 'path';
import * as fs from 'fs';
import axios, { AxiosInstance } from 'axios';
import { traverse } from '@atlaskit/adf-utils/traverse';
import { ADFEntity } from '@atlaskit/adf-utils/types';
import { Content } from '../../../confluence-api/types';
import { Output } from '../../../configuration/types';
import { api } from '../../../confluence-api';

const extractAvatars = async (content: Content, output: Output) => {
    const { author } = content;
    const avatarFile = path.resolve(
        output.assets.avatars,
        `${author.id}-avatar`
    );
    if (fs.existsSync(avatarFile)) return;

    const { stream } = await api.getAttachmentData(author.avatar, '');
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
    if (id.match(UUID_REGEX)) return;

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
