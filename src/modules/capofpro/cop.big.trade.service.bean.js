/**
 * 通过 TradeDay 同步, 在 16点之后同步仅一次。
 * 接口 返回的是指定日期的数据。。数据内带有日期字段。
 */
class CopBigTradeService {


    // ---------------------------------------------------------------------------------------------------
    // 同步大宗交易动作入口
    async syncData() {
        // 从14天前开始逐天抓取，抓取过的就跳过,每次抓取间隔1分钟？
        const symbols = ['A股', 'B股', '基金', '债券'];
        for (const symbol of symbols) {

            //
            const markType = `block_trade_${symbol}`;
            const func = this.fetchSaveData.bind(this);
            const funcArgs = {
                symbol: symbol,
            };
            //
            await this.copService.catchUpTradeDays({
                markType,
                syncFunc: func,
                funcArgs,
            });
        }
    }

    // 同步具体某一天的大宗交易
    async fetchSaveData(args) {

        const {
            dateInt,
            symbol
        } = args;


        // doc https://akshare.akfamily.xyz/data/stock/stock.html#id327
        // http://127.0.0.1:8080/api/public/stock_dzjy_mrmx?symbol=A股&start_date=20250815&end_date=20250815
        // http get 上面的url

        const data = await this.copService.callAkTool({
            api: "stock_dzjy_mrmx",
            params: {
                symbol,
                start_date: dateInt,
                end_date: dateInt
            }
        });

        for (const item of data) {
            const id = await this.idgen.next();
            const blockTrade = this.BlockTrade.build({id});
            blockTrade.value = item;
            await blockTrade.save();
        }
    }


}

module.exports = CopBigTradeService;