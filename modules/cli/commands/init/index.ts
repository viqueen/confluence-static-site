import { start, get } from 'prompt';
import path from 'path';
import * as fs from 'fs';

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
