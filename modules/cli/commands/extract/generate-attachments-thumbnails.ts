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
import fs from 'fs';

import { listFiles } from '@labset/fs-directory';
import sharp from 'sharp';

import { Output } from '../../conf';

const generateForImageExt = async (
    output: Output,
    ext: string,
    options: { force: boolean }
) => {
    const images = listFiles(output.attachments, {
        fileFilter: (entry) => {
            return (
                entry.name.endsWith(ext) &&
                !entry.name.endsWith(`-thumbnail${ext}`)
            );
        },
        directoryFilter: () => true
    });

    return Promise.all(
        images.map((image) => {
            const thumbnail = image.replace(ext, `-thumbnail${ext}`);
            const thumbnailSymlink = thumbnail.replace(ext, '');
            const thumbnailExists = fs.existsSync(thumbnail);
            if (thumbnailExists && !options.force) {
                if (!fs.existsSync(thumbnailSymlink)) {
                    fs.symlinkSync(thumbnail, thumbnailSymlink);
                }
            } else {
                if (thumbnailExists) {
                    fs.rmSync(thumbnail, { recursive: true });
                }
                return sharp(image)
                    .resize({
                        height: 300,
                        fit: sharp.fit.cover
                    })
                    .toFile(thumbnail)
                    .then(() => {
                        if (!fs.existsSync(thumbnailSymlink)) {
                            fs.symlinkSync(thumbnail, thumbnailSymlink);
                        }
                    })
                    .catch((error) =>
                        console.error(`thumbnail: ${thumbnail}`, error)
                    );
            }
        })
    );
};

export const generateAttachmentsThumbnails = async (
    output: Output,
    options: { force: boolean }
) => {
    await generateForImageExt(output, '.png', options);
    await generateForImageExt(output, '.jpeg', options);
    await generateForImageExt(output, '.jpg', options);
};
