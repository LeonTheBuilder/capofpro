/**
 * 返回的是最近一个交易日的数据。数据内带有日期字段。
 * 每天16点同步仅一次。
 */

class CopHsgtFundFlowSummaryService {

    async syncData() {
        //
        const markType = "CopHsgtFundFlowSummaryService";
        await this.copService.syncByRecentTradeDay({
            markType,
            syncFunc: this.fetchSaveData.bind(this),
            funcArgs: {},
        });
    }


    async fetchSaveData() {
        const data = await this.copService.callAkTool({
            api: "stock_hsgt_fund_flow_summary_em",
            params: {}
        });
        this.log.info(data);

        for (const item of data) {
            //
            const id = await this.idgen.next();
            const hsgtTradeSummary = this.HsgtTradeSummary.build({id});
            hsgtTradeSummary.value = item;
            await hsgtTradeSummary.save();
        }
    }

}

module.exports = CopHsgtFundFlowSummaryService;