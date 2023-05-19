import * as crypto from 'crypto';
import * as fs from 'fs';
import * as http from 'http';
import * as os from 'os';
import * as path from 'path';
import qs from 'querystring';

import axios from 'axios';
import express from 'express';
import open from 'open';

import { configuration } from '../configuration';

import { scopes } from './scopes';

type CliOauthClientProps = {
    name: string;
    clientId: string;
    clientSecret: string;
    scopes: string[];
    authorizeUrl: string;
    grantUrl: string;
    state: string;
};

class CliOauthClient {
    private readonly props: CliOauthClientProps;
    private readonly redirectUri;
    constructor(props: Omit<CliOauthClientProps, 'state' | 'scopes'>) {
        this.props = { ...props, state: crypto.randomUUID(), scopes };
        this.redirectUri = `http://localhost:6060/oauth/callback/${this.props.name}`;
    }

    private _authorizationUrl() {
        const authQuery = {
            response_type: 'code',
            client_id: this.props.clientId,
            scope: this.props.scopes.join(' '),
            redirect_uri: this.redirectUri,
            state: this.props.state
        };
        return `${this.props.authorizeUrl}?${qs.stringify(authQuery)}`;
    }

    private async _grantAccess(code: string) {
        const client = axios.create({
            baseURL: this.props.grantUrl,
            auth: {
                username: this.props.clientId,
                password: this.props.clientSecret
            }
        });
        const query = {
            grant_type: 'authorization_code',
            code,
            redirect_uri: this.redirectUri
        };
        return client.request({
            url: '',
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(query)
        });
    }

    private _storeToken(payload: any) {
        const target = path.join(os.homedir(), '.oauth', this.props.name);
        fs.mkdirSync(target, { recursive: true });
        fs.writeFileSync(
            path.join(target, 'token.json'),
            JSON.stringify(payload)
        );
    }

    async login() {
        return new Promise((resolve) => {
            const app = express();
            const server = http.createServer(app);

            app.get(
                `/oauth/callback/${this.props.name}`,
                async (request, response) => {
                    const { code, state } = request.query;
                    if (state !== this.props.state) {
                        console.error('invalid state');
                        response.sendStatus(400);
                    } else {
                        const { data, headers } = await this._grantAccess(
                            code as string
                        );
                        console.info('** grant headers', headers);
                        this._storeToken(data);
                        response.sendStatus(200);
                    }
                    server.close();
                    resolve({});
                }
            );

            server.listen(6060, () => {
                open(this._authorizationUrl());
            });
        });
    }

    async accessToken(): Promise<string | undefined> {
        const target = path.join(
            os.homedir(),
            '.oauth',
            this.props.name,
            'token.json'
        );
        if (!fs.existsSync(target)) {
            console.error('you need to login first');
            return;
        }
        const payload = JSON.parse(fs.readFileSync(target).toString());
        // TODO: handle refresh token, also I need typescript
        return payload.access_token;
    }
}

export const cliOauthClient = new CliOauthClient({
    name: 'confluence-static-site',
    clientId: configuration.OAUTH_CLIENT_ID,
    clientSecret: configuration.OAUTH_CLIENT_SECRET,
    authorizeUrl: 'https://auth.atlassian.com/authorize',
    grantUrl: 'https://auth.atlassian.com/oauth/token'
});
