class AppViewController {
    index = async (ctx) => {
        await this.vr.render(ctx, __dirname, "./views/index.ejs")
    };
    mappings = [
        ['', 'GET', this.index],
        ['/', 'GET', this.index],
        ['/reports/big.trade.report', 'GET', async (ctx) => {
            await this.vr.render(ctx, __dirname, "./views/reports/big.trade.report.ejs")
        }],
    ];
}

module.exports = AppViewController;
