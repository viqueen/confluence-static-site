import { hydrate, render } from 'react-dom';
import React from 'react';
import { fontFamily } from '@atlaskit/theme';
import { SiteContent } from './site-content';
import {
    PageLayout,
    TopNavigation,
    Content,
    Main
} from '@atlaskit/page-layout';
import { SiteTopNavigation } from './site-top-navigation';

const StaticSite = () => {
    return (
        <div style={{ fontFamily: fontFamily() }}>
            <PageLayout>
                <TopNavigation>
                    <SiteTopNavigation />
                </TopNavigation>
                <Content>
                    <Main>
                        <SiteContent />
                    </Main>
                </Content>
            </PageLayout>
        </div>
    );
};

const rootElm = document.querySelector('#root')!;
if (rootElm.hasChildNodes()) {
    hydrate(<StaticSite />, rootElm);
} else {
    render(<StaticSite />, rootElm);
}
