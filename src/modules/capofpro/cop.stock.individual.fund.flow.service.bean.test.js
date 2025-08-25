const loadContext = require('../../loadcontext');


it('copStockIndividualFundFlowService.fetchSaveByMarketCode', async () => {
    const a = await loadContext();
    const models = a.models;
    const beans = a.beans;
    // -------------------------------------------------------
    const copStockIndividualFundFlowService = beans.copStockIndividualFundFlowService;

    const args = {
        stock: '600094',
        market: 'sh'
    };
    //
    await copStockIndividualFundFlowService.fetchSaveByMarketCode(args);
    // -------------------------------------------------------
    process.exit(0);
}).timeout(10 * 60 * 1000);




