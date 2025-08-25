const loadContext = require('../../loadcontext');


it('copBigTradeService.syncData', async () => {
    const a = await loadContext();
    const models = a.models;
    const beans = a.beans;
    // -------------------------------------------------------
    const copBigTradeService = beans.copBigTradeService;
    await copBigTradeService.syncData();
    // -------------------------------------------------------
    process.exit(0);
}).timeout(10 * 60 * 1000);
