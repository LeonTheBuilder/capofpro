/**
 * 仅在两个 points 日期内检查一次。
 * 接口 返回的数据内不带有日期字段，自行添加。
 */
class CopTenShareHoldersService {

    // ---------------------------------------------------------------------------------------------------
    async startWorkerForSyncData() {
        this.Sugar.schedule(
            async () => this.syncData(),
            60 * 1000 * 5  //
        );
    }


    // 返回下一个需要同步的 stock 的代码
    async findNextStock2Sync() {
        // 查询 ShareholderStock 表
        const currentYearInt = parseInt(this.Sugar.curDate2String("YYYY"));
        //
        const points = [
            (currentYearInt - 1) * 10000 + 1101, //'1101' // 去年三季报
            currentYearInt * 10000 + 501, // '0501', // 年报,一季报
            currentYearInt * 10000 + 901, //'0901', // 半年报
            currentYearInt * 10000 + 1101, //'1101' // 三季报
        ];

        const yearMonthDayInt = parseInt(this.Sugar.curDate2String("YYYYMMDD"));

        let currentPoint = 0;
        if (points[0] <= yearMonthDayInt && yearMonthDayInt < points[1]) {
            currentPoint = points[0];
        } else if (points[1] <= yearMonthDayInt && yearMonthDayInt < points[2]) {
            currentPoint = points[1];
        } else if (points[2] <= yearMonthDayInt && yearMonthDayInt < points[3]) {
            currentPoint = points[2];
        } else {
            currentPoint = points[3];
        }
        // 获取 Stock 的 tenHolderSyncDateInt 小于 currentPoint 的第一个。
        const nextStock = await this.Stock.findOne({
            where: {
                tenHolderSyncDateInt: {
                    [this.Sequelize.Op.lt]: currentPoint
                }
            },
            order: [
                ['tenHolderSyncDateInt', 'DESC']
            ]
        });

        if (nextStock) {
            return nextStock.id;
        } else {
            return null;
        }
    }


    // --------------------------------------------------------------------------------------
    // 同步十大流通股东(个股)
    async syncData() {
        const nextStockCode = await this.findNextStock2Sync();
        if (!nextStockCode) {
            return;
        }
        await this.fetchSaveData({
            code: nextStockCode
        });
    }


    async fetchSaveData(args) {
        const {
            code
        } = args;
        //
        const dateInt = this.copService.currentDateInt();

        //
        const marketMark = await this.guessMarketMarkByCode(code);
        const codeWithMarketMark = `${marketMark}${code}`;
        const data = await this.copService.callAkTool({
            api: "stock_gdfx_free_top_10_em",
            params: {
                symbol: codeWithMarketMark
            }
        });
        //

        for (const item of data) {
            //
            item.dateInt = dateInt;
            const id = await this.idgen.next();
            const shareholder = this.StockShareholder.build({id});
            shareholder.value = item;
            await shareholder.save();
        }


        // 更新 stock 的 tenHolderSyncDateInt
        const stock = await this.Stock.findByPk(code);
        stock.set({
            tenHolderSyncDateInt: dateInt
        });
        await stock.save();
    }


    // 上海证券交易所: sh, 深证证券交易所: sz, 北京证券交易所: bj
    async guessMarketMarkByCode(code) {
        return code.startsWith("6") ? "sh" : "sz";
    }


}

module.exports = CopTenShareHoldersService;