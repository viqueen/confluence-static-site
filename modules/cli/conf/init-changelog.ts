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

interface Changelog {
    pages: string;
    blogs: string;
}

const initChangelog = (props: {
    spaceKey: string;
    destination: string;
}): Changelog => {
    const { spaceKey, destination } = props;
    const changelogOutput = path.resolve(destination, 'site', spaceKey);
    fs.mkdirSync(changelogOutput, { recursive: true });
    return {
        pages: path.resolve(changelogOutput, 'notes'),
        blogs: path.resolve(changelogOutput, 'articles')
    };
};

export { initChangelog };
export type { Changelog };
