import { Attachment } from '../../../external/confluence-api/types';
import React, { useCallback, useState } from 'react';
import ImageViewer from 'react-simple-image-viewer';

type MediaViewerContextInfo = {
    openMediaViewer: (fileId: string) => void;
};

const MediaViewerContext = React.createContext<MediaViewerContextInfo>({
    openMediaViewer: (_fileId: string) => {}
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

    const images = attachments.map((a) => `/attachments/${a.fileId}`);

    const closeImageViewer = () => {
        setCurrentImageIndex(0);
        setIsViewerOpen(false);
    };

    const openMediaViewer = useCallback((fileId: string) => {
        const index = images.findIndex((item) => item.endsWith(fileId));
        setCurrentImageIndex(index);
        setIsViewerOpen(true);
    }, []);

    const value = { openMediaViewer };
    return (
        <MediaViewerContext.Provider value={value}>
            {children}
            {isViewerOpen && (
                <ImageViewer
                    src={images}
                    currentIndex={currentImageIndex}
                    closeOnClickOutside={true}
                    onClose={closeImageViewer}
                />
            )}
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
