import { GenerateThemeArgs } from '@atlaskit/atlassian-navigation';

export type SiteProperties = {
    title: string;
    iconUrl: string;
    prefix: string;
    theme: GenerateThemeArgs;
};

export const siteProperties: SiteProperties = {
    title: 'viqueen.org',
    iconUrl: '',
    prefix: '/vi',
    theme: {
        name: 'static-site',
        backgroundColor: 'rgb(0, 102, 68)',
        highlightColor: '#FFFFFF'
    }
};
