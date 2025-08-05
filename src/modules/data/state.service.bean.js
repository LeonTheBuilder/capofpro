class StateService {

    async upsertStockState(args) {
        //
        const {
            code, title, price,
            priceRatioDay, priceRatioDay3, priceRatioDay5,
            turnoverRatioDay, turnoverRatioDay3, turnoverRatioDay5,
            turnoverDay, turnoverDay3, turnoverDay5,
            capFlowDay, capFlowDay3, capFlowDay5,
            capFlowIn, capFlowOut
        } = args;
        //
        const dateInt = this.timeHelper.dateInt();
        const hourInt = this.timeHelper.hourInt();
        //
        let stockState = await this.StockState.findOne({
            where: {
                stockId: code,
                dateInt,
            }
        });

        if (!stockState) {
            const id = await this.idgen.next();
            stockState = this.StockState.build({
                id
            });
        }

        stockState.set(args);
        stockState.stockId = code;
        stockState.dateInt = dateInt;
        await stockState.save();
    }


    async upsertStockBigTrade(args) {
        //
        const {
            stockId,
            dateInt,
            price,
            amount,
            instBuyId,
            instSellId,
        } = args;
        // 以 stockId、instBuyId、instSellId 为唯一键
        let stockBigTrade = await this.StockBigTrade.findOne({
            where: {
                stockId,
                dateInt,
                instBuyId,
                instSellId,
            }
        });
        if (!stockBigTrade) {
            const id = await this.idgen.next();
            stockBigTrade = this.StockBigTrade.build({
                id
            });
        }
        stockBigTrade.set(args);
        await stockBigTrade.save();
        return stockBigTrade.id;
    }

}

module.exports = StateService;