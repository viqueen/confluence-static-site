import { Content } from '../../../external/confluence-api/types';
import { confluenceMacroCore } from './confluence-macro-core';
import { viqueenMedia } from './viqueen-media';

export const extensionHandlers = (content: Content) => {
    return {
        'com.atlassian.confluence.macro.core': confluenceMacroCore(content),
        'org.viqueen.media': viqueenMedia
    };
};
