class OuterDataService {

    async onData(args) {
        const {
            dataType, // dzjy
            data
        } = args;
        //
        switch (dataType) {
            case 'dzjy':
                await this.onDzjyData(args);
                break;
        }
    }

    async onDzjyData(args) {
        const {
            dataType, // dzjy
            data
        } = args;

        // ------------------------------------------------------------
        const trades = data.trades;
        for (const trade of trades) {
            // ------------------------------------------------------------
            // 插入股票数据
            // {
            //       "dateInt": 20250812,
            //       "stockCode": "000851",
            //       "stockName": "*ST高鸿",
            //       "tradePrice": "2.00",
            //       "tradeVolume": "30.00",
            //       "premiumRate": 0,
            //       "buyDeptName": "东海证券股份有限公司南京分公司",
            //       "sellDeptName": "中信证券(山东)有限责任公司青岛连云港路证券营业部"
            //     }
            // ------------------------------------------------------------

            // 插入股票数据
            const productArgs = {
                code: trade.stockCode,
                title: trade.stockName,
            };
            await this.productService.upsertStock(productArgs);

            // 插入机构营业部
            const sbdArgsBuy = {
                title: trade.buyDeptName
            };
            const sbdArgsSell = {
                title: trade.sellDeptName
            };
            const buyDeptId = await this.subjectService.upsertTrader(sbdArgsBuy);
            const sellDeptId = await this.subjectService.upsertTrader(sbdArgsSell);
            // ------------------------------------------------------------
            // 插入大宗交易订单
            const bigTradeArgs = {
                stockId: trade.stockCode,
                dateInt: trade.dateInt,
                tradePrice: trade.tradePrice,
                tradeVolume: trade.tradeVolume,
                tradeAmount: trade.tradeVolume,
                premiumRate: trade.premiumRate,
                instBuyId: buyDeptId,
                instSellId: sellDeptId,
            };
            await this.stateService.upsertStockBigTrade(bigTradeArgs);
        }

        // ------------------------------------------------------------
        const stockMap = data.stockMap;

        // 循环 stockMap 的key
        for (const stockCode of Object.keys(stockMap)) {
            const {stockBasicInfo, tenHolders} = stockMap[stockCode];

            if (!stockBasicInfo) {
                continue;
            }


            /**
             *     "stockBasicInfo": {
             *         "openPrice": "1.90",
             *         "tradingVolume": 130.54,
             *         "amplitude": 0,
             *         "highestPrice": "1.90",
             *         "turnover": 248.03,
             *         "turnoverRate": 0.12,
             *         "lowestPrice": "1.90",
             *         "totalMarketValue": "22.00",
             *         "priceToBookRatio": "3.71",
             *         "previousClose": "2.00",
             *         "circulatingMarketValue": "21.51",
             *         "priceEarningsRatioDynamic": "亏损",
             *         "votingRightDifference": "否",
             *         "tradingStatus": "连续竞价"
             *       }
             */

                // 插入股票数据
            const productArgs = {
                    code: stockBasicInfo.code,
                    price: stockBasicInfo.highestPrice,
                    totalMarketValue: stockBasicInfo.totalMarketValue,
                    circulatingMarketValue: stockBasicInfo.circulatingMarketValue,
                    priceToBookRatio: stockBasicInfo.priceToBookRatio,
                    priceEarningsRatioDynamic: stockBasicInfo.priceEarningsRatioDynamic,
                };
            await this.productService.upsertStock(productArgs);
            // ------------------------------------------------------------
            // 插入股票状态
            const stateArgs = {
                stockId: stockBasicInfo.code,
                code: stockBasicInfo.code,
                dateInt: stockBasicInfo.dateInt,
                totalMarketValue: stockBasicInfo.totalMarketValue,
                circulatingMarketValue: stockBasicInfo.circulatingMarketValue,
                priceToBookRatio: stockBasicInfo.priceToBookRatio,
                priceEarningsRatioDynamic: stockBasicInfo.priceEarningsRatioDynamic,
                openPrice: stockBasicInfo.openPrice,
                highestPrice: stockBasicInfo.highestPrice,
                lowestPrice: stockBasicInfo.lowestPrice,
                previousClose: stockBasicInfo.previousClose,
                amplitude: stockBasicInfo.amplitude,
                tradingVolume: stockBasicInfo.tradingVolume,
                turnover: stockBasicInfo.turnover,
                turnoverRate: stockBasicInfo.turnoverRate,
            }
            await this.stateService.upsertStockState(stateArgs);
            // ------------------------------------------------------------
            for (const holder of tenHolders) {
                /**
                 *  {
                 *           "holdQuantity": 1188.07,
                 *           "holdChange": "不变",
                 *           "circulatingShareRatio": 1.05,
                 *           "changeRatio": "100.00%",
                 *           "shareType": "不变",
                 *           "holderName": "曾东卫"
                 *         },
                 */
                this.log.info(holder);
                const {
                    holdQuantity,
                    holdChange,
                    circulatingShareRatio,
                    changeRatio,
                    shareType,
                    holderName
                } = holder;

                if (!holderName) {
                    continue;
                }

                //
                const upsertTradeArgs = {
                    title: holderName
                };
                // 插入持股人信息
                const traderId = await this.subjectService.upsertTrader(upsertTradeArgs);
                //
                const upsertHoldArgs = {
                    stockId: stockBasicInfo.code,
                    traderId: traderId,
                    holdType: holder.holdType,
                    holdQuantity: holder.holdQuantity,
                    holdRatio: holder.holdRatio,
                };
                // 插入持股信息
                await this.stateService.upsertStockHolding(upsertHoldArgs);

            }
        }

    }

    apis = [
        [this.onData, async (ctx) => {
            const args = await this.ah.ctx2args(ctx, false, false);
            await this.onData(args);
        }],
    ];

}

module.exports = OuterDataService;