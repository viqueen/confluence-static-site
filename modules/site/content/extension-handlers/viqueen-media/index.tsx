import React from 'react';

import type {
    ExtensionParams,
    Parameters
} from '@atlaskit/editor-common/extensions';

import { MediaFile } from './media-file';

export const viqueenMedia = (ext: ExtensionParams<Parameters>) => {
    if (ext.extensionKey !== 'file') {
        console.warn(
            '** missing media extension handler',
            ext.extensionKey,
            ext
        );
        return null;
    }
    const layout = ext.parameters?.layout;
    const attrs = ext.parameters?.data[0].attrs;
    const width = ext.parameters?.width;
    return (
        <MediaFile
            fileId={attrs.id}
            width={width}
            height={attrs.height}
            layout={layout}
        />
    );
};
