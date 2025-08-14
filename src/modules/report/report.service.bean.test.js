const loadContext = require('../../loadcontext');


it('reportService.getBigTradeReport', async () => {
    const a = await loadContext();
    // -------------------------------------------------------
    const reportService = a.beans.reportService;
    const res = await reportService.getBigTradeReport({});
    a.models.Sugar.writeFile(a.beans.pathFinder.appGenFolder() + "/dzjyReport.gen.json", JSON.stringify(res));
    // -------------------------------------------------------
    process.exit(0);
}).timeout(100000);
