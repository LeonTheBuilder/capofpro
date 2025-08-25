const loadContext = require('../../loadcontext');


it('copDepTradeService.syncData', async () => {
    const a = await loadContext();
    const models = a.models;
    const beans = a.beans;
    // -------------------------------------------------------
    const copDepTradeService = beans.copDepTradeService;
    await copDepTradeService.syncData();
    // -------------------------------------------------------
    process.exit(0);
}).timeout(10 * 60 * 1000);


it('copDepTradeService.fetchSaveData', async () => {
    const a = await loadContext();
    const models = a.models;
    const beans = a.beans;
    // -------------------------------------------------------
    const copDepTradeService = beans.copDepTradeService;
    await copDepTradeService.fetchSaveData({
        dateInt: 20250819
    });
    // -------------------------------------------------------
    process.exit(0);
}).timeout(10 * 60 * 1000);



