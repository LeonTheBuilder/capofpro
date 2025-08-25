class CopController {
    mappings = [
        ['/cop/big.trade.report', 'GET', async (ctx) => {
            await this.vr.render(ctx, __dirname, "big.trade.report.ejs")
        }],
    ];
}

module.exports = CopController;
