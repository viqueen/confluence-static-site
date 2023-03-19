export type Identifier = {
    id: string;
    title: string;
};

export type Attachment = {
    fileId: string;
    downloadUrl: string;
    mediaType: string;
    isCover: boolean;
};

export type AttachmentData = {
    stream: any;
};

export type Content = {
    identifier: Identifier;
    type: 'page' | 'blogpost';
    body: any;
    excerpt: string;
    asHomepage: boolean;
    hasPdf: boolean;

    author: Identifier & { avatar: string; accountId: string };
    lastModifiedDate: number;
    createdDate: number;
    createdYear: number;

    parentPages?: Identifier[];
    childPages?: (Identifier & { emoji?: string })[];
    attachments?: Attachment[];
    cover?: Attachment;
    emoji?: string;
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
