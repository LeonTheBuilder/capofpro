class OuterDataService {

    async onData(args) {
        const {
            dataType,
            data
        } = args;

        //
        const stockMap = data.stockMap;
        // const {stockBasicInfo, tenHolders} = stockMap[stockCode];
        const trades = data.trades;
        // ------------------------------------------------------------
        for (const trade of trades) {
            // ------------------------------------------------------------
            // 插入股票数据
            const productArgs = {
                code: trade.code,
                title: trade.name,
                price: trade.price
            };
            await this.productService.upsertStock(productArgs);
            // ------------------------------------------------------------
            // 插入股票状态
            const stateArgs = {
                code: trade.code,
                title: trade.name,
                price: trade.price
            };
            await this.stateService.upsertStockState(stateArgs);
            // ------------------------------------------------------------
            // 插入机构营业部
            const sbdArgsBuy = {
                title: trade.buyDept
            };
            const sbdArgsSell = {
                title: trade.sellDept
            };
            const buyDeptId = await this.subjectService.upsertSecurityBusinessDepartment(sbdArgsBuy);
            const sellDeptId = await this.subjectService.upsertSecurityBusinessDepartment(sbdArgsSell);
            // ------------------------------------------------------------
            // 插入大宗交易订单
            const bigTradeArgs = {
                stockId: trade.code,
                dateInt: trade.DataInt,
                price: trade.price,
                amount: trade.amount,
                instBuyId: buyDeptId,
                instSellId: sellDeptId,
            };
            await this.stateService.upsertStockBigTrade(bigTradeArgs);
        }


        for (const {stockBasicInfo, tenHolders} of Object.entries(stockMap)) {
            // ------------------------------------------------------------
            // 插入股票数据
            const productArgs = {
                code: stockCode,
                title: stock.stockBasicInfo.name,
                price: stock.stockBasicInfo.price
            };
            await this.productService.upsertStock(productArgs);
            // ------------------------------------------------------------
            // 插入股票状态
            const stateArgs = {
                code: stockCode,
                title: stock.stockBasicInfo.name,
            }
            await this.stateService.upsertStockState(stateArgs);
            // ------------------------------------------------------------
            for (const holder of tenHolders) {

            }
        }

    }

    apis = [
        [this.onData, async (ctx) => {
            const args = await this.ah.ctx2args(ctx, false, false);
            await this.onData(args);
        }],
    ];

}

module.exports = OuterDataService;