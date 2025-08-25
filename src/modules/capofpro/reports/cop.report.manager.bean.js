class CopReportManager {

    async listReports(args) {
        const beans = this.getBeans({isReport: true});
        return beans.map(bean => {
            return {
                name: bean.name,
                title: bean.title,
                description: bean.description,
            }
        })
    }


    apis = [
        [this.listReports, async (ctx) => {
            const args = await this.ah.ctx2args(ctx, false, false);
            ctx.body = await this.listReports(args);
        }],
    ];
}

module.exports = CopReportManager;