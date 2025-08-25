const loadContext = require('../../loadcontext');


it('copStockIndividualFundFlowRankService.fetchSave', async () => {
    const a = await loadContext();
    const models = a.models;
    const beans = a.beans;
    // -------------------------------------------------------
    const copStockIndividualFundFlowRankService = beans.copStockIndividualFundFlowRankService;
    await copStockIndividualFundFlowRankService.fetchSave();
    // -------------------------------------------------------
    process.exit(0);
}).timeout(10 * 60 * 1000);




