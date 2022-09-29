import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import {
    EmojiId,
    EmojiProvider,
    OptionalEmojiDescriptionWithVariations
} from '@atlaskit/emoji';

const emojiProvider = async () => {
    const fetchByEmojiId = async (
        emojiId: EmojiId
    ): Promise<OptionalEmojiDescriptionWithVariations> => {
        return {
            ...emojiId,
            type: 'static',
            category: 'static',
            searchable: false,
            representation: {
                imagePath: `/assets/emojis/${emojiId.id}.png`,
                width: 64,
                height: 64
            }
        };
    };
    const fetchEmojiProvider = async () => undefined;
    return { fetchByEmojiId, fetchEmojiProvider } as unknown as EmojiProvider;
};

export const dataProviders = () => {
    return ProviderFactory.create({
        emojiProvider: emojiProvider()
    });
};
