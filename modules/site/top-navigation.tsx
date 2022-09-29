import React from 'react';
import {
    AtlassianNavigation,
    PrimaryButton,
    generateTheme,
    ProductHome,
    CustomProductHome
} from '@atlaskit/atlassian-navigation';
import { siteProperties } from './site-properties';

const theme = generateTheme(siteProperties.theme);

const HomeLink = () => {
    return (
        <a href="/" style={{ textDecoration: 'none' }}>
            <PrimaryButton isHighlighted={true}>
                {siteProperties.title}
            </PrimaryButton>
        </a>
    );
};

const Home = () => {
    return (
        <CustomProductHome
            iconAlt={siteProperties.title}
            iconUrl={siteProperties.iconUrl}
            logoAlt={siteProperties.title}
            logoUrl={siteProperties.iconUrl}
        />
    );
};

export const TopNavigation = () => {
    return (
        <AtlassianNavigation
            label="viqueen.org"
            primaryItems={[<HomeLink />]}
            renderProductHome={Home}
            theme={theme}
        />
    );
};
