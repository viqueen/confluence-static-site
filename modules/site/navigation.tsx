import React from 'react';
import {
    AtlassianNavigation,
    PrimaryButton,
    generateTheme,
    ProductHome
} from '@atlaskit/atlassian-navigation';
import { AtlassianIcon, AtlassianLogo } from '@atlaskit/logo';

const theme = generateTheme({
    name: 'high-contrast',
    backgroundColor: 'rgb(0, 102, 68)',
    highlightColor: '#FFFFFF'
});

const HomeLink = () => {
    return (
        <a href="/" style={{ textDecoration: 'none' }}>
            <PrimaryButton isHighlighted={true}>viqueen.org</PrimaryButton>
        </a>
    );
};

const Home = () => {
    return <ProductHome icon={AtlassianIcon} logo={AtlassianLogo} />;
};

export const Navigation = () => {
    return (
        <AtlassianNavigation
            label="viqueen.org"
            primaryItems={[<HomeLink />]}
            renderProductHome={Home}
            theme={theme}
        />
    );
};
