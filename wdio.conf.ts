import type { Options } from '@wdio/types';
import { spawn } from 'child_process';
import * as path from 'path';

export const config: Options.Testrunner = {
    runner: 'local',
    autoCompileOpts: {
        tsNodeOpts: {
            project: './test/tsconfig.json'
        }
    },
    specs: ['./test/specs/**/*.e2e.ts'],
    exclude: [],
    maxInstances: 10,
    capabilities: [
        {
            maxInstances: 5,
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
        'selenium-standalone',
        [
            'image-comparison',
            {
                baselineFolder: path.join(process.cwd(), 'test', 'baseline'),
                formatImageName: '{tag}-{logName}-{width}x{height}',
                screenshotPath: path.join(process.cwd(), '.tmp'),
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
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: function (config, capabilities) {
        spawn(`./cli`, ['build', 'public', '--dest', 'local', '--serve'], {
            shell: false
        });
    }
};
