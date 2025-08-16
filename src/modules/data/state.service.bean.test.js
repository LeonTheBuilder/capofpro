const loadContext = require('../../loadcontext');


it('stateService.addTestSellData', async () => {
    const a = await loadContext();
    // -------------------------------------------------------
    const instBuyId = '2025081616411900000011520';
    const tradeAmount = 1000;
    const stockId = '000425';
    const dateInt = 20250813;
    //
    const id = await a.beans.idgen.next();
    const stockBigTrade = a.models.StockBigTrade.build({
        id,
    });
    stockBigTrade.set({
        instBuyId,
        tradeAmount,
        stockId,
        dateInt,
    });
    await stockBigTrade.save();
    // -------------------------------------------------------
    process.exit(0);
}).timeout(100000);


it('stateService.queryTestSellData', async () => {
    const a = await loadContext();
    // -------------------------------------------------------
    const instBuyId = '2025081616411900000011520';
    const stockId = '000425';
    //
    const stockBigTrade = await a.models.StockBigTrade.findOne({
        where: {
            instBuyId,
            stockId
        }
    });
    console.log(stockBigTrade);
    // -------------------------------------------------------
    process.exit(0);
}).timeout(100000);



