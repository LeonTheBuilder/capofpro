const loadContext = require('../../loadcontext');


it('copStockMarketFundFlowService.fetchSave', async () => {
    const a = await loadContext();
    const models = a.models;
    const beans = a.beans;
    // -------------------------------------------------------
    const copStockMarketFundFlowService = beans.copStockMarketFundFlowService;
    await copStockMarketFundFlowService.fetchSave();
    // -------------------------------------------------------
    process.exit(0);
}).timeout(10 * 60 * 1000);




