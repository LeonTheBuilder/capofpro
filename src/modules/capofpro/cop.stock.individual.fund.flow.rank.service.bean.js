/**
 * 返回的是最近一个交易日的数据。数据内带不带有日期字段。自行添加日期数据。
 * 每天16点同步仅一次。
 */

class CopStockIndividualFundFlowRankService {

    async syncData() {
        //
        const markType = "CopStockIndividualFundFlowRankService";
        await this.copService.syncByRecentTradeDay({
            markType,
            syncFunc: this.fetchSaveData.bind(this),
            funcArgs: {},
        });
    }

    async fetchSaveData(args) {
        const {
            dateInt
        } = args;
        //
        const data = await this.copService.callAkTool({
            api: "stock_individual_fund_flow_rank",
            params: {}
        });
        this.log.info(data);

        for (const item of data) {
            item.dateInt = dateInt;
            const id = await this.idgen.next();
            const stockFundFlowRank = this.StockFundFlowRank.build({id});
            stockFundFlowRank.value = item;
            await stockFundFlowRank.save();
        }
    }

}

module.exports = CopStockIndividualFundFlowRankService;