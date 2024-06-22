/* eslint-disable import/no-unresolved */
import React, { useCallback, useState } from 'react';

import noop from 'lodash/noop';
// eslint-disable-next-line import/no-named-as-default
import Lightbox from 'yet-another-react-lightbox';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

import 'yet-another-react-lightbox/styles.css';
import { Attachment } from '../../../apis';

type MediaViewerContextInfo = {
    openMediaViewer: (fileId: string) => void;
};

const MediaViewerContext = React.createContext<MediaViewerContextInfo>({
    openMediaViewer: (_fileId: string) => noop()
});

const MediaViewerProvider = ({
    children,
    attachments
}: {
    children: React.ReactNode;
    attachments: Attachment[];
}) => {
    const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    const slides = attachments.map((a) => ({
        src: `/attachments/${a.fileId}`
    }));

    const closeImageViewer = () => {
        setCurrentImageIndex(0);
        setIsViewerOpen(false);
    };

    const openMediaViewer = useCallback((fileId: string) => {
        const index = slides.findIndex((item) => item.src.endsWith(fileId));
        setCurrentImageIndex(index);
        setIsViewerOpen(true);
    }, []);

    const value = { openMediaViewer };
    return (
        <MediaViewerContext.Provider value={value}>
            {children}
            <Lightbox
                open={isViewerOpen}
                close={closeImageViewer}
                slides={slides}
                index={currentImageIndex}
                plugins={[Fullscreen, Zoom]}
            />
        </MediaViewerContext.Provider>
    );
};

const useMediaViewer = () => {
    const context = React.useContext(MediaViewerContext);
    if (context == undefined) {
        throw Error('useMediaViewer must be used within a MediaViewerProvider');
    }
    return context;
};

export { MediaViewerProvider, useMediaViewer };
