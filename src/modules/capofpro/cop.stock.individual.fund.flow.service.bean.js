/**
 * 单次获取指定市场和股票的近 100 个交易日的资金流数据.
 * 数据不带有 stockCode，手动添加.
 * 如何去重？
 */

class CopStockIndividualFundFlowService {
    async fetchSaveByMarketCode(args) {
        //
        const {
            market,
            stock
        } = args;
        //
        const data = await this.copService.callAkTool({
            api: "stock_individual_fund_flow",
            params: {
                stock: stock,
                market: market
            }
        });
        this.log.info(data);
        for (const item of data) {
            item.stockCode = stock;
            const id = await this.idgen.next();
            const stockFundFlow = this.StockFundFlow.build({id});
            stockFundFlow.value = item;
            await stockFundFlow.save();
        }

    }
}

module.exports = CopStockIndividualFundFlowService;