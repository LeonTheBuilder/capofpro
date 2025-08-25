const loadContext = require('../../loadcontext');


it('copMarginAccountService.syncData', async () => {
    const a = await loadContext();
    const models = a.models;
    const beans = a.beans;
    // -------------------------------------------------------
    const copMarginAccountService = beans.copMarginAccountService;
    await copMarginAccountService.syncData();
    // -------------------------------------------------------
    process.exit(0);
}).timeout(10 * 60 * 1000);

