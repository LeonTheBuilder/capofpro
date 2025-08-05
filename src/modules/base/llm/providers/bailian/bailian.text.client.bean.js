const OpenAI = require('openai');

//模型列表：https://help.aliyun.com/zh/model-studio/getting-started/models
class BailianLlmTextClient {

    //
    llm = true;
    type = 'text';
    provider = 'bailian';

    //
    _client;

    getClient() {
        if (this._client) {
            return this._client;
        }

        //
        const openAiConfig = {
            apiKey: this.cfg.llm.bailian.apiKey, // API Key 从配置中读取
            baseURL: this.cfg.llm.bailian.baseURL, // 基础 URL
        };
        //
        this._client = new OpenAI(openAiConfig);

        //
        return this._client;
    }

    getModels(args) {
        return [
            {'title': 'qwen-turbo', 'max_input_tokens': 1000000, 'max_output_tokens': 38912},
            {'title': 'qwen-plus', 'max_input_tokens': 129024, 'max_output_tokens': 38912},
        ];
    }

    async complete(args) {
        const {
            model = 'qwen-turbo',
            temperature = 1.8,
            max_tokens = 1024,
        } = args;
        if (!args.seed) {
            args.seed = this.Sugar.randomDigits(4)
        }
        this.log.info('call bailian start');
        const response = await this.getClient().chat.completions.create(args);
        this.log.info('call bailian end');
        return response;
    }

}

module.exports = BailianLlmTextClient;
