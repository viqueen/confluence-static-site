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
