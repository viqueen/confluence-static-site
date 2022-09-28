import { Content } from '../confluence-api/types';
import { Output } from '../configuration/types';
import { api } from '../confluence-api';
import * as path from 'path';
import * as fs from 'fs';

export const extractAttachments = async (content: Content, output: Output) => {
    const { attachments } = content;
    if (!attachments) return;

    return Promise.all(
        attachments.map((attachment) => {
            return api
                .getAttachmentData(attachment.downloadUrl)
                .then(({ stream }) => {
                    const filePath = path.resolve(
                        output.attachments,
                        attachment.fileId
                    );
                    const file = fs.createWriteStream(filePath);
                    return stream.pipe(file);
                });
        })
    );
};
