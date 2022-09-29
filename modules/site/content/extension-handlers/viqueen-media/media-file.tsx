import React from 'react';
import './media-file.css';

type MediaFileProps = {
    fileId: string;
    height: number;
    layout?: string;
};

export const MediaFile = ({ fileId, height, layout }: MediaFileProps) => {
    const layoutClass = layout ? `layout-${layout}` : `layout`;
    return (
        <div className="media-file">
            <img
                src={`/attachments/${fileId}`}
                style={{ height, maxHeight: 600 }}
                className={layoutClass}
            />
        </div>
    );
};
