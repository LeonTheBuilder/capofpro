/**
 * 返回的是最近一个交易日的数据。数据内带不带有日期字段。自行添加日期数据。
 * 每天16点同步仅一次。
 */
class CopRealtimeQuotesService {


    async syncData() {
        //
        const markType = "CopRealtimeQuotesService";
        await this.copService.syncByRecentTradeDay({
            markType,
            syncFunc: this.fetchSaveData.bind(this),
            funcArgs: {},
        });
    }

    // --------------------------------------------------------------------------------------
    // 同步实时行情数据-东财
    async fetchSaveData(args) {

        const {
            dateInt
        } = args;

        const data = await this.copService.callAkTool({
            api: "stock_zh_a_spot_em",
            params: {}
        });
        this.log.info(data);
        //
        for (const item of data) {
            item.dateInt = dateInt;
            const code = item['代码'];
            const title = item['名称'];
            const latestPrice = item['最新价'];
            const marketCap = item['总市值'];
            const circulatingMarketCap = item['流通市值'];


            const id = await this.idgen.next();
            const realtimeQuote = this.RealtimeQuote.build({id});
            realtimeQuote.value = item;
            await realtimeQuote.save();

            // upsert stock
            let stock = await this.Stock.findByPk(code);
            if (!stock) {
                stock = this.Stock.build({id: code, title});
                stock.title = title;

            }
            //
            stock.set({
                title: title,
                latestPrice: latestPrice,
                marketCap: marketCap,
                circulatingMarketCap: circulatingMarketCap,
            });
            await stock.save();


        }
    }


}

module.exports = CopRealtimeQuotesService;