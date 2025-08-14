class ReportService {
    async getBigTradeReport(args) {

        let {
            dateInt,
            page,
            pageSize
        } = args;
        //
        if (!dateInt) {
            // 查询 StockBigTrade 表里里面 dateInt 最大的值
            dateInt = await this.StockBigTrade.max('dateInt');
            this.log.info('dateInt', dateInt);
        }

        // ------------------------------------------------
        // big trades
        const bigTrades = await this.StockBigTrade.findAll({
            where: {
                dateInt: dateInt,
            },
            limit: args.limit,
            order: [
                ['tradeAmount', 'DESC'],
            ]
        });


        // ------------------------------------------------
        // stocks
        const stocks = await this.Stock.findAll({
            where: {
                id: {
                    [this.Sequelize.Op.in]: bigTrades.map(trade => trade.stockId)
                }
            }
        });


        // ------------------------------------------------
        // insts
        const buyInsts = await this.SecurityBusinessDepartment.findAll({
            where: {
                id: {
                    [this.Sequelize.Op.in]: bigTrades.map(trade => trade.instBuyId)
                }
            }
        });
        const sellInsts = await this.SecurityBusinessDepartment.findAll({
            where: {
                id: {
                    [this.Sequelize.Op.in]: bigTrades.map(trade => trade.instSellId)
                }
            }
        });


        return {
            bigTrades,
            stocks,
            buyInsts,
            sellInsts
        };

    }

    apis = [
        [this.getBigTradeReport, async (ctx) => {
            const args = await this.ah.ctx2args(ctx, false, false);
            await this.getBigTradeReport(args);
        }],
    ];


}

module.exports = ReportService;