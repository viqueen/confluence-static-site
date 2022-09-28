import { Content } from '../confluence-api/types';
import { Output } from '../configuration/types';
import * as path from 'path';
import * as fs from 'fs';
import { api } from '../confluence-api';

export const extractAssets = async (content: Content, output: Output) => {
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
