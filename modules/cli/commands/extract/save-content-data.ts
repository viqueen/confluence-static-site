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
import fs from 'fs';
import path from 'path';

import { Content } from '../../../apis';
import { scrubContent } from '../../../external/confluence-api/adf-processor';
import { titleToPath } from '../../../external/confluence-api/helpers/title-to-path';
import { Output } from '../../conf';

const resolveContentPath = (content: Content, output: Output) => {
    if (content.asHomepage) return output.home;
    const root = content.type === 'page' ? output.pages : output.blogs;
    return path.resolve(root, titleToPath(content.identifier.title));
};

const symlinkForInternals = (content: Content, output: Output) => {
    if (content.asHomepage) return;
    const directory = content.type === 'page' ? output.pages : output.blogs;
    const symlink = path.resolve(directory, content.identifier.id);
    if (fs.existsSync(symlink)) return;
    fs.symlinkSync(
        path.resolve(directory, titleToPath(content.identifier.title)),
        symlink
    );
};

export const saveContentData = async (content: Content, output: Output) => {
    const scrubbed = scrubContent(content.body);
    const data: Content = {
        ...content,
        body: scrubbed
    };
    const contentPath = resolveContentPath(content, output);
    fs.mkdirSync(contentPath, { recursive: true });
    fs.writeFileSync(
        path.resolve(contentPath, 'data.json'),
        JSON.stringify(data)
    );
    symlinkForInternals(content, output);
};
