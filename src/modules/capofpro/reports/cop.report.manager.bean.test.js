const loadContext = require('../../../loadcontext');


it('copReportManager.listReports', async () => {
    const a = await loadContext();
    const models = a.models;
    const beans = a.beans;
    // -------------------------------------------------------
    const copReportManager = beans.copReportManager;
    const res = await copReportManager.listReports({});
    a.log.info(res);
    // -------------------------------------------------------
    process.exit(0);
}).timeout(10 * 60 * 1000);

