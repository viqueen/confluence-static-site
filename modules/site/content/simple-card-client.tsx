import { Client, ResolveResponse } from '@atlaskit/smart-card';
import { JsonLd } from 'json-ld-types';
import crypto from 'crypto';
import axios from 'axios';

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

    async prefetchData(url: string): Promise<JsonLd.Response | undefined> {
        return undefined;
    }
}
