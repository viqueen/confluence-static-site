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
import * as fs from 'fs';
import path from 'path';

import { start, get } from 'prompt';

export const init = async () => {
    const properties = [
        {
            name: 'confluence site name',
            validator: /[a-zA-Z0-9-]+\.atlassian\.net/
        },
        { name: 'confluence username' },
        { name: 'confluence api token', hidden: true },
        { name: 'confluence cloud token', hidden: true },
        { name: 'target site' },
        { name: 'twitter site' },
        { name: 'google analytics tracking id' }
    ];

    start();
    const result = await get(properties);
    const envFile = path.resolve(process.cwd(), '.env');
    const envData = Object.entries(result)
        .map(([key, value]) => {
            return `${key.replace(/\s/g, '_').toUpperCase()}=${value}`;
        })
        .join('\n');
    fs.writeFileSync(envFile, envData);
};
