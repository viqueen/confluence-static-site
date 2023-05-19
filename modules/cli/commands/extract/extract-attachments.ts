import * as fs from 'fs';
import * as path from 'path';

import { Output } from '../../../configuration/types';
import { confluenceApi } from '../../../external/confluence-api';
import { Content } from '../../../external/confluence-api/types';

const toExtension = (mediaType: string) => {
    const matcher = mediaType.match(/image\/(?<ext>jpeg|jpg|png)/);
    const ext = matcher?.groups?.ext;
    if (ext) return `.${ext}`;
    return '';
};

export const extractAttachments = async (content: Content, output: Output) => {
    const { attachments } = content;
    if (!attachments) return;

    return Promise.all(
        attachments.map((attachment) => {
            return confluenceApi
                .getAttachmentData(attachment.downloadUrl)
                .then(({ stream }) => {
                    const fileExtension = toExtension(attachment.mediaType);
                    const filePath = path.resolve(
                        output.attachments,
                        `${attachment.fileId}${fileExtension}`
                    );

                    if (fileExtension !== '') {
                        const symlink = path.resolve(
                            output.attachments,
                            attachment.fileId
                        );
                        if (!fs.existsSync(symlink))
                            fs.symlinkSync(filePath, symlink);
                    }

                    const file = fs.createWriteStream(filePath);
                    return stream.pipe(file);
                });
        })
    );
};
