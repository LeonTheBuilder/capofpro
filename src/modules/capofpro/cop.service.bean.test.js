const loadContext = require('../../loadcontext');


it('copService.callAkTool', async () => {
    const a = await loadContext();
    const models = a.models;
    const beans = a.beans;
    // -------------------------------------------------------
    const copService = beans.copService;
    const data = await copService.callAkTool({
        api: "stock_hsgt_fund_flow_summary_em",
        params: {}
    });
    console.log(data);
    // -------------------------------------------------------
    process.exit(0);
}).timeout(10 * 60 * 1000);



