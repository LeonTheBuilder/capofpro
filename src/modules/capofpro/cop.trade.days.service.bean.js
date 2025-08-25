class CopTradeDaysService {


    // --------------------------------------------------------------------------------------
    // 同步交易日
    async syncTradeDays() {
        // 获得今天的 日期 int4
        const curDateInt = parseInt(this.Sugar.curDate2String("YYYY"));
        const maxTradeDay = await this.TradeDay.max("id");
        this.log.info(`maxTradeDay is ${maxTradeDay}`);
        const needSync = !maxTradeDay || maxTradeDay < curDateInt * 10000;
        if (!needSync) {
            this.log.info(`no need sync trade days`);
            return;
        }

        //
        const data = await this.copService.callAkTool({
            api: "tool_trade_date_hist_sina",
            params: {}
        });
        for (const item of data) {
            const dayInt = parseInt(this.Sugar.convertDateStringFormat(item.trade_date, "YYYY-MM-DD", "YYYYMMDD"))
            await this.TradeDay.upsert({
                id: dayInt,
            });
        }
        //
    }


}

module.exports = CopTradeDaysService;