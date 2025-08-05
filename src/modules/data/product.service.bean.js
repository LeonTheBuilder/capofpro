class ProductService {


    async upsertStock(args) {
        //
        const {
            code,
            title,
            price,

        } = args;
        //

        let stock = await this.Stock.findByPk(code);
        if (!stock) {
            stock = this.Stock.build({id: code});
        }
        stock.set(args);
        await stock.save();

        return stock.id;
    }


    async getStocks(args) {
        //
        return await this.Stock.findAll();
    }


    apis = [
        [this.getStocks, async (ctx) => {
            const args = await this.ah.ctx2args(ctx, false, false);
            ctx.body = await this.getStocks(args);
        }],
    ];
}

module.exports = ProductService;