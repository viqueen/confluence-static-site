export type Identifier = {
    id: string;
    title: string;
};

export type Content = {
    identifier: Identifier;
    type: 'page' | 'blogpost';

    children?: Identifier[];
};
