/**
 * 通过 TradeDay 同步, 在 16点之后同步仅一次
 * 接口 返回的是指定日期的数据。。数据内带有日期字段。
 */

class CopMarginAccountService {

    // --------------------------------------------------------------------------------------
    // 融资融券明细
    async syncData() {

        const markType = "syncStockMarginDetail";
        await this.copService.catchUpTradeDays({
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
            api: "stock_margin_detail_sse",
            params: {
                date: dateInt
            }
        });
        this.log.info(data);
        for (const item of data) {
            const id = await this.idgen.next();
            const stockMarginDetail = this.MarginTradingDetail.build({id});
            stockMarginDetail.value = item;
            await stockMarginDetail.save();
        }
    }


}

module.exports = CopMarginAccountService;