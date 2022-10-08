import * as path from 'path';
import * as fs from 'fs';
import { Content } from '../../../confluence-api/types';
import { Output } from '../../../configuration/types';
import { api } from '../../../confluence-api';

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
            return api
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
