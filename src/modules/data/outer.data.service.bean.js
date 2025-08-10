class OuterDataService {

    async onData(args) {
        const {
            dataType,
            data
        } = args;

        //
    }

    apis = [
        [this.onData, async (ctx) => {
            const args = await this.ah.ctx2args(ctx, false, false);
            await this.onData(args);
        }],
    ];

}

module.exports = OuterDataService;