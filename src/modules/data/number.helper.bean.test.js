const loadContext = require('../../loadcontext');

it('numberHelper.yi2wan', async () => {
    const a = await loadContext();
    const numberHelper = a.beans.numberHelper;
    const result = numberHelper.yi2wan('1.59亿');
    console.log(result);
    process.exit(0);
}).timeout(100000);








