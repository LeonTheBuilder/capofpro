const loadContext = require('../../loadcontext');


it('copTenShareHoldersService.fetchSaveData', async () => {
    const a = await loadContext();
    const models = a.models;
    const beans = a.beans;
    // -------------------------------------------------------
    const copTenShareHoldersService = beans.copTenShareHoldersService;

    const args = {
        code: '600000'
    };
    await copTenShareHoldersService.fetchSaveData(args);
    // -------------------------------------------------------
    process.exit(0);
}).timeout(10 * 60 * 1000);



