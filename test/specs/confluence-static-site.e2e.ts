describe('Confluence Static Site', () => {
    beforeEach(async () => {
        await browser.setWindowSize(1920, 1080);
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
