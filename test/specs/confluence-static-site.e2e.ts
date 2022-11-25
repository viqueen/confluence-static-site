describe('confluence-static-site', () => {
    beforeEach(async () => {
        await browser.url('http://localhost:9000/');
    });

    it('should render the home page', async () => {
        const title = await browser.getTitle();
        expect(title).toEqual('/conf - Git');
    });

    it('should save some screenshots', async () => {
        await browser.saveScreen('home-page');
    });

    it('should compare successfully with a baseline', async () => {
        const result = await browser.checkScreen('home-page');
        expect(result).toEqual(0);
    });
});
