import React from 'react';
import './media-file.css';
import { useMediaViewer } from '../../media-viewer-provider';

type MediaFileProps = {
    fileId: string;
    height: number;
    layout?: string;
};

export const MediaFile = ({ fileId, height, layout }: MediaFileProps) => {
    const { openMediaViewer } = useMediaViewer();
    const layoutClass = layout ? `layout-${layout}` : `layout`;
    return (
        <div className="media-file">
            <img
                src={`/attachments/${fileId}`}
                style={{ height, maxHeight: 600 }}
                className={layoutClass}
                onClick={() => openMediaViewer(fileId)}
            />
        </div>
    );
};
