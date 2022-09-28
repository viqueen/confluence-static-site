export type Identifier = {
    id: string;
    title: string;
};

export type Content = {
    identifier: Identifier;
    type: 'page' | 'blogpost';
    body: any;

    lastModifiedDate: number;

    children?: Identifier[];
};

export type ResourceObject = {
    resourceUrl: string;
};

export type ResourceDefinition = {
    url: string;
    generator: { icon: { url: string } };
    name: string;
    '@type': string;
};
