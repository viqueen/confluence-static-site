import fs from 'fs';

import { listFiles } from 'fs-directory';
import sharp from 'sharp';

import { Output } from '../../../configuration/types';

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
