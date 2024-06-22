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

import AppProvider from '@atlaskit/app-provider';
import {
    PageLayout,
    TopNavigation,
    Content,
    Main,
    LeftSidebar
} from '@atlaskit/page-layout';
import { hydrateRoot, createRoot } from 'react-dom/client';

import { SiteContent } from './site-content';
import { SiteLeftNavigation } from './site-left-navigation';
import { SiteTopNavigation } from './site-top-navigation';

import '@atlaskit/css-reset/dist/bundle.css';

const StaticSite = () => {
    return (
        <AppProvider defaultColorMode="dark">
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
        </AppProvider>
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
