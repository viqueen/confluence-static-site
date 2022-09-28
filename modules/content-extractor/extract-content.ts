import { Content } from '../confluence-api/types';
import { Output } from '../configuration/types';

export const extractContent = async (content: Content, output: Output) => {
    console.info(`📑 extract content`, content.identifier);
};
