import Avatar from '@atlaskit/avatar';
import Button from '@atlaskit/button';
import { Date } from '@atlaskit/date';
import { colorPalette } from '@atlaskit/theme/color-palettes';
import React from 'react';

import { Content } from '../../external/confluence-api/types';

type ContentBylineProps = {
    content: Content;
};

export const ContentByLine = ({ content }: ContentBylineProps) => {
    if (content.asHomepage) return <></>;
    return (
        <>
            <div style={{ marginTop: 20, marginBottom: 60 }}>
                <div style={{ float: 'left', marginRight: 10 }}>
                    <Avatar
                        appearance="square"
                        src={`/assets/avatars/${content.author.id}-avatar`}
                        size="large"
                        name={content.author.title}
                        presence="online"
                    />
                </div>
                {content.hasPdf && (
                    <div style={{ float: 'right' }}>
                        <Button
                            appearance="primary"
                            href={`/assets/pdfs/${content.identifier.id}.pdf`}
                            target="_blank"
                        >
                            View as PDF
                        </Button>
                    </div>
                )}
                <div style={{ color: colorPalette('24')[16].background }}>
                    <div>by {content.author.title}</div>
                    <div style={{ marginTop: '5px', display: 'inline-block' }}>
                        on{' '}
                        <Date
                            value={content.createdDate}
                            color="blue"
                            format="MMMM do y"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
