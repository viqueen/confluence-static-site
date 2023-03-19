import { hydrate, render } from 'react-dom';
// import { IntlProvider } from 'react-intl-next';
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
        // <IntlProvider locale="en">
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
        // </IntlProvider>
    );
};

const rootElm = document.querySelector('#root')!;
if (rootElm.hasChildNodes()) {
    hydrate(<StaticSite />, rootElm);
} else {
    render(<StaticSite />, rootElm);
}
