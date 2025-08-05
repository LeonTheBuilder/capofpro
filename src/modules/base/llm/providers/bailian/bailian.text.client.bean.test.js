const loadContext = require('../../../../loadcontext');

it('complete', async () => {

    const a = await loadContext();
    const bailianLlmTextClient = a.beans.bailianLlmTextClient;
    const idgen = a.beans.idgen;
    const seed = await idgen.nextInt();
    const rand = await a.models.Sugar.randomDigits(10);
    const message = `
    请给我一个日本消失的三十年相关的话题。
要求：
1. 要求每次返回的内容不同，这是第${seed}次请求。
2. 以如下json格式返回
{'topic':'话题'}
   `;
    const args = {
        temperature: 1.8,
        message: message,
        enableSearch: false,
        maxToken: 16384,
    };
    const resp = await bailianLlmTextClient.complete(args);
    // 数字经济时代下的就业结构转型与挑战
    //
    console.info(resp.content);
}).timeout(100000);
