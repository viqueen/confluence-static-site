import { hydrateRoot, createRoot } from 'react-dom/client';
import React from 'react';
import { fontFamily } from '@atlaskit/theme';
import { SiteContent } from './site-content';
import {
    PageLayout,
    TopNavigation,
    Content,
    Main,
    LeftSidebar
} from '@atlaskit/page-layout';
import { SiteTopNavigation } from './site-top-navigation';
import { SiteLeftNavigation } from './site-left-navigation';

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

const rootContainer = document.querySelector('#root')!;
if (rootContainer.hasChildNodes()) {
    hydrateRoot(rootContainer, <StaticSite />);
} else {
    createRoot(rootContainer).render(<StaticSite />);
}
