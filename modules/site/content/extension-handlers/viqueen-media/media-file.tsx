import React from 'react';

import './media-file.css';
import { useMediaViewer } from '../../media-viewer-provider';

type MediaFileProps = {
    fileId: string;
    height: number;
    width?: number;
    layout?: string;
};

export const MediaFile = ({
    fileId,
    height,
    width,
    layout
}: MediaFileProps) => {
    const { openMediaViewer } = useMediaViewer();
    const layoutClass = layout ? `layout-${layout}` : `layout`;
    const min = width ? Math.min(width, height) : height;
    return (
        <div className="media-file">
            <img
                src={`/attachments/${fileId}`}
                style={{ height: min, maxHeight: 600, width }}
                className={layoutClass}
                onClick={() => openMediaViewer(fileId)}
            />
        </div>
    );
};
