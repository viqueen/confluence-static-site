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
