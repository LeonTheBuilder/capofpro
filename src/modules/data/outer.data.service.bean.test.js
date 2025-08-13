const loadContext = require('../../loadcontext');

it('outerDataService.onData', async () => {
    const a = await loadContext();
    const outerDataService = a.beans.outerDataService;
    // --------------------------------------------

    const thsDzjyData = a.models.Sugar.readFileContent(a.beans.pathFinder.appGenFolder() + "/dzjy.gen.json");
    const dataJson = JSON.parse(thsDzjyData);
    console.log(dataJson);


    await outerDataService.onData({
        dataType: "dzjy",
        data: dataJson
    });

    // --------------------------------------------
    process.exit(0);
}).timeout(100000);








