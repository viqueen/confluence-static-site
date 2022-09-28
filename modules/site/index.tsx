import { hydrate, render } from 'react-dom';
import React from 'react';

const Site = () => {
    return <div>Confluence Static Site</div>;
};

const rootElm = document.querySelector('#root')!;
if (rootElm.hasChildNodes()) {
    hydrate(<Site />, rootElm);
} else {
    render(<Site />, rootElm);
}
