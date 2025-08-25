class CopBigTradeReport {


    isReport = true;
    title = '大宗交易报告';

    // ---------------------------------------------------------------------------------------------------

    // 同步大宗交易动作入口
    async generateDataFile() {
        const blockTrades = await this.blockTrades({});
        //
        const string = `
 # 大宗交易数据
  ${JSON.stringify(blockTrades)}
 `;
        return string;
    }


    // 获得三天内的股票的 realtime quote
    async blockTrades(args) {
        const today = new Date();
        // 计算前N天的时间戳（一天的毫秒数：24*60*60*1000）
        const previousTime = today.getTime() - 7 * 24 * 60 * 60 * 1000;
        // 创建前N天的日期对象
        const previousDate = new Date(previousTime);

        const currentDateInt = this.copService.currentDateInt();

        let dateInt = parseInt(this.Sugar.date2string(previousDate, "YYYYMMDD"));
        const data = await this.copService.callAkTool({
            api: "stock_dzjy_mrmx",
            params: {
                symbol: 'A股',
                start_date: dateInt,
                end_date: currentDateInt
            }
        });
        return data;
    }


    // 同步具体某一天的大宗交易
    async getPrompts(args) {
        const prompts = this.Sugar.readFileContent(this.path.join(__dirname, 'cop.big.trade.report.tpl'));
        return prompts;
    }

    mappings = [
        ['/cop/big.trade.report/copBigTradeReport/generate.data.file', 'GET', async (ctx) => {
            const args = await this.ah.ctx2args(ctx, false, false);
            const content = await this.generateDataFile(args);
            ctx.set('Content-Type', 'application/octet-stream');
            ctx.set('Content-Disposition', 'attachment; filename="long-text.txt"');
            // 设置内容长度（可选，但推荐）
            ctx.set('Content-Length', Buffer.byteLength(content).toString());
            // 将文本内容作为响应体返回
            ctx.body = content;
        }]
    ];

    apis = [
        [this.getPrompts, async (ctx) => {
            const args = await this.ah.ctx2args(ctx, false, false);
            const prompts = await this.getPrompts(args);
            ctx.body = prompts;
        }]
    ];


}

module.exports = CopBigTradeReport;