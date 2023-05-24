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
import crypto from 'crypto';

import { Client } from '@atlaskit/smart-card';
import type { ResolveResponse } from '@atlaskit/smart-card';
import axios from 'axios';
import { JsonLd } from 'json-ld-types';

export class SimpleCardClient extends Client {
    async fetchData(url: string): Promise<JsonLd.Response> {
        const cardHash = crypto
            .createHash('sha512')
            .update(url)
            .digest('hex')
            .toString();
        const { data } = await axios.get(`/object-resolver/${cardHash}.json`);
        return {
            meta: {
                access: 'granted',
                visibility: 'public'
            },
            data
        } as ResolveResponse;
    }

    async prefetchData(_url: string): Promise<JsonLd.Response | undefined> {
        return undefined;
    }
}
