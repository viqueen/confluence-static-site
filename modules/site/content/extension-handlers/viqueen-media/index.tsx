import React from 'react';
import { ExtensionParams } from '@atlaskit/editor-common/extensions';
import { MediaFile } from './media-file';

export const viqueenMedia = (ext: ExtensionParams<any>) => {
    if (ext.extensionKey !== 'file') {
        console.warn('** missing media extension handler', ext.extensionKey);
        return null;
    }
    const layout = ext.parameters.layout;
    const attrs = ext.parameters.data[0].attrs;
    return (
        <MediaFile fileId={attrs.id} height={attrs.height} layout={layout} />
    );
};
