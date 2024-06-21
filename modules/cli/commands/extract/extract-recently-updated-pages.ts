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

import { confluence } from '../../clients';
import { Output } from '../../conf';

const extractRecentlyUpdatedPages = async (
    spaceKey: string,
    output: Output
) => {
    console.info('✏️ extract recently updated pages');
    const notes = await confluence.getSpaceRecentlyUpdatedPages(spaceKey);
    const homepage = await confluence.getSpaceHomepage(spaceKey);
    fs.writeFileSync(
        path.resolve(output.home, 'recently-updated.json'),
        JSON.stringify({ homepage, notes })
    );
};

export { extractRecentlyUpdatedPages };
