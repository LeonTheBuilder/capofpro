/**
 * 大盘资金流
 * 接口 返回的数据里面不带有股票代码？而且不是一天的数据，是连续很多天的数据，如何去重？
 */
class CopStockMarketFundFlowService {

    async fetchSave(args) {
        const data = await this.copService.callAkTool({
            api: "stock_market_fund_flow",
            params: {}
        });
        this.log.info(data);
        for (const item of data) {

            //
            const id = await this.idgen.next();
            const stockMarketFundFlow = this.StockMarketFundFlow.build({id});
            stockMarketFundFlow.value = item;
            //
            await stockMarketFundFlow.save();
        }
    }

}

module.exports = CopStockMarketFundFlowService;