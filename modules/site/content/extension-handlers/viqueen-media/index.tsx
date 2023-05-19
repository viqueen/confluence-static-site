import type { ExtensionParams } from '@atlaskit/editor-common/extensions';
import React from 'react';

import { MediaFile } from './media-file';

export const viqueenMedia = (ext: ExtensionParams<any>) => {
    if (ext.extensionKey !== 'file') {
        console.warn(
            '** missing media extension handler',
            ext.extensionKey,
            ext
        );
        return null;
    }
    const layout = ext.parameters.layout;
    const attrs = ext.parameters.data[0].attrs;
    const width = ext.parameters.width;
    console.info('**', { layout, attrs, width });
    return (
        <MediaFile
            fileId={attrs.id}
            width={width}
            height={attrs.height}
            layout={layout}
        />
    );
};
