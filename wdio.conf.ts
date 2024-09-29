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
import { ChildProcess, spawn } from 'child_process';
import * as path from 'path';

import type { Options } from '@wdio/types';

const testEnvironment = process.env.TEST_ENVIRONMENT ?? 'local';

let testServerProcess: ChildProcess;

// noinspection JSUnusedGlobalSymbols
export const config: Options.Testrunner = {
    runner: 'local',
    specs: ['./test/specs/**/*.e2e.ts'],
    exclude: [],
    maxInstances: 10,
    capabilities: [
        {
            'wdio:maxInstances': 5,
            browserName: 'chrome',
            acceptInsecureCerts: true,
            'goog:chromeOptions': {
                args: ['--headless', '--disable-gpu', '--disable-dev-shm-usage']
            }
        }
    ],
    logLevel: 'info',
    bail: 0,

    baseUrl: 'http://localhost:9000',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        [
            'image-comparison',
            {
                baselineFolder: path.join(process.cwd(), 'test', 'baseline'),
                formatImageName: `{tag}-${testEnvironment}-{width}x{height}`,
                screenshotPath: path.join(process.cwd(), 'artifacts'),
                savePerInstance: true,
                autoSaveBaseline: true,
                blockOutStatusBar: true,
                blockOutToolbar: true
            }
        ]
    ],

    framework: 'mocha',
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    /**
     * Gets executed once before all workers get launched.
     * @param _config
     * @param _capabilities
     */
    onPrepare: function (_config, _capabilities) {
        testServerProcess = spawn(
            `node`,
            [
                'dist/cli/index.js',
                'build',
                'public',
                '--dest',
                'local',
                '--serve'
            ],
            {
                shell: false
            }
        );
    },

    onComplete(
        _exitCode: number,
        _config: Omit<Options.Testrunner, 'capabilities'>,
        _capabilities,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _results: any
    ): unknown | Promise<unknown> {
        return testServerProcess.kill();
    }
};
