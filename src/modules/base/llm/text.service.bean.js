class LlmTextService {

    async complete(args) {
        const {
            provider = 'bailian',
            params,
        } = args;
        //
        try {

            const start = process.hrtime();
            const llm = this.getBean({
                llm: true,
                type: 'text',
                provider: provider
            });
            //
            this.log.info('params', params);
            const response = await llm.complete(params);
            this.log.info('response', response);

            const prompt_tokens = response.usage.prompt_tokens;
            const completion_tokens = response.usage.completion_tokens;
            const total_tokens = response.usage.total_tokens;
            const status_code = response.status_code;
            this.log.info('status_code', status_code);
            const message = response.message;
            // record token usages
            const rid = await this.idgen.next('llrid');
            const tokenUsage = this.TokenUsage.build({id: rid});
            tokenUsage.model = params.model;
            tokenUsage.provider = provider;
            tokenUsage.status_code = status_code;
            tokenUsage.message = message;
            tokenUsage.prompt_tokens = prompt_tokens;
            tokenUsage.completion_tokens = completion_tokens;
            const diff = process.hrtime(start);
            tokenUsage.duration = diff[0] + diff[1] / 1e9;
            await tokenUsage.save();
            //
            return {
                content: response.choices[0].message.content,
                prompt_tokens,
                completion_tokens,
                total_tokens,
                status_code,
                message
            }
        } catch (e) {
            this.log.error(e);
            throw e;
        }
        //
    }


}

module.exports = LlmTextService;