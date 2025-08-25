const loadContext = require('../../loadcontext');


it('copHsgtFundFlowSummaryService.fetchSaveData', async () => {
    const a = await loadContext();
    const models = a.models;
    const beans = a.beans;
    // -------------------------------------------------------
    const copHsgtFundFlowSummaryService = beans.copHsgtFundFlowSummaryService;
    await copHsgtFundFlowSummaryService.fetchSaveData();
    // -------------------------------------------------------
    process.exit(0);
}).timeout(10 * 60 * 1000);

