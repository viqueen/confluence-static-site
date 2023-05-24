/**
 * Copyright 2023 Hasnae Rehioui
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { ProviderFactory } from '@atlaskit/editor-common/provider-factory';
import type {
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
