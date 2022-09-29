import { hydrate, render } from 'react-dom';
import React from 'react';
import { fontFamily } from '@atlaskit/theme';
import { TopNavigation } from './top-navigation';
import { MainContent } from './main-content';

// TODO: top-navigation should be customizable

const Site = () => {
    return (
        <div
            style={{
                top: 0,
                left: 0,
                position: 'fixed',
                width: '100%',
                fontFamily: fontFamily()
            }}
        >
            <TopNavigation />
            <MainContent />
        </div>
    );
};

const rootElm = document.querySelector('#root')!;
if (rootElm.hasChildNodes()) {
    hydrate(<Site />, rootElm);
} else {
    render(<Site />, rootElm);
}
