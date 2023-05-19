import React from 'react';

import { Content } from '../../external/confluence-api/types';

type ContentCoverProps = {
    content: Content;
};

export const ContentCover = ({ content }: ContentCoverProps) => {
    if (!content.cover) return <></>;
    const { fileId } = content.cover;
    return (
        <img
            src={`/attachments/${fileId}`}
            style={{
                height: '28rem',
                objectFit: 'cover',
                width: '100%',
                display: 'flex'
            }}
            className="media-file"
            alt={'its-a-cover-up'}
        />
    );
};
