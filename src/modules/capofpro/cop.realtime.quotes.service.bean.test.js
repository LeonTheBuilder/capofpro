const loadContext = require('../../loadcontext');


it('copRealtimeQuotesService.fetchSaveData', async () => {
    const a = await loadContext();
    const models = a.models;
    const beans = a.beans;
    // -------------------------------------------------------
    const copRealtimeQuotesService = beans.copRealtimeQuotesService;
    await copRealtimeQuotesService.syncData();
    // -------------------------------------------------------
    process.exit(0);
}).timeout(10 * 60 * 1000);




