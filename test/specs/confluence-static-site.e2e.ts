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
describe('Confluence Static Site', () => {
    beforeEach(async () => {
        await browser.setWindowSize(1600, 1200);
        await browser.url('http://localhost:9000/');
        await browser.waitUntil(
            async () => (await browser.getTitle()) === '/conf - Git',
            {
                timeout: 5000,
                timeoutMsg: 'expected title to be different after 5s'
            }
        );
    });

    it('should save some screenshots', async () => {
        await browser.saveScreen('home-page');
    });

    it('should compare successfully with a baseline', async () => {
        const result = await browser.checkScreen('home-page');
        expect(result).toEqual(0);
    });
});
