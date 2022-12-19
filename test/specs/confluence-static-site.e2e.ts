describe('My Login application', () => {
    beforeEach(async () => {
        await browser.url('http://localhost:9000/');
    });

    it('should render the home page', async () => {
        const title = await browser.getTitle();
        expect(title).toEqual('/conf - Git');
    });
});
