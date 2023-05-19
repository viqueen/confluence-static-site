import React from 'react';

import {
    PageLayout,
    TopNavigation,
    Content,
    Main,
    LeftSidebar
} from '@atlaskit/page-layout';
import { fontFamily } from '@atlaskit/theme';
import { hydrateRoot, createRoot } from 'react-dom/client';

import { SiteContent } from './site-content';
import { SiteLeftNavigation } from './site-left-navigation';
import { SiteTopNavigation } from './site-top-navigation';

const StaticSite = () => {
    return (
        <div style={{ fontFamily: fontFamily() }}>
            <PageLayout>
                <TopNavigation>
                    <SiteTopNavigation />
                </TopNavigation>
                <Content>
                    <LeftSidebar>
                        <SiteLeftNavigation />
                    </LeftSidebar>
                    <Main>
                        <SiteContent />
                    </Main>
                </Content>
            </PageLayout>
        </div>
    );
};

const rootContainer = document.querySelector('#root');
if (rootContainer) {
    if (rootContainer.hasChildNodes()) {
        hydrateRoot(rootContainer, <StaticSite />);
    } else {
        createRoot(rootContainer).render(<StaticSite />);
    }
}
