const loadContext = require('../../../loadcontext');
//
it('llmTextService.complete', async () => {
    //
    const a = await loadContext();
    const llmTextService = a.beans.llmTextService;
    //
    const messages = [
        {role: 'system', content: 'You are a helpful assistant.'},
        {role: 'user', content: '你是谁？'},
    ];
    const params = {
        modelName: 'qwen-turbo-latest',
        messages: messages,
        enableSearch: true,
        maxToken: 8192,
    };
    const resp = await llmTextService.complete({provider: 'bailian', params: params});
    console.info(JSON.stringify(resp));

    process.exit(0);
}).timeout(3600 * 1000);
