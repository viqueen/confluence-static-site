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
import React from 'react';

import './media-file.css';
import noop from 'lodash/noop';

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
                alt={fileId}
                style={{ height: min, maxHeight: 600, width }}
                className={layoutClass}
                onClick={() => openMediaViewer(fileId)}
                onKeyDown={() => noop()}
            />
        </div>
    );
};
