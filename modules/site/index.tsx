import { hydrate, render } from 'react-dom';
import React from 'react';
import { fontFamily } from '@atlaskit/theme';
import { Navigation } from './navigation';

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
            <Navigation />
        </div>
    );
};

const rootElm = document.querySelector('#root')!;
if (rootElm.hasChildNodes()) {
    hydrate(<Site />, rootElm);
} else {
    render(<Site />, rootElm);
}
