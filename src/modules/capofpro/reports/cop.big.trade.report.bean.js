class CopBigTradeReport {


    isReport = true;
    title = '大宗交易报告';


    // ---------------------------------------------------------------------------------------------------
    // 同步大宗交易动作入口
    async generateDataFile() {
        const realtimeQuotes = await this.realtimeQuotes({});
        const blockTrades = await this.blockTrades({});
        //
        const string = `# 行情数据
 ${JSON.stringify(realtimeQuotes)}
 # 大宗交易数据
  ${JSON.stringify(blockTrades)}
 `;
        const id = await this.idgen.next();
        this.Sugar.writeFile(`${this.pathFinder.appGenFolder()}/${id}.gen.md`, string);

    }


    async realtimeQuotes(args) {
        const {
            days = 5
        } = args;
        // 计算当前时间 days 天前的日期，要8位 YYYYMMDD 格式的整数
        // 创建当前日期对象
        const today = new Date();
        // 计算前N天的时间戳（一天的毫秒数：24*60*60*1000）
        const previousTime = today.getTime() - days * 24 * 60 * 60 * 1000;
        // 创建前N天的日期对象
        const previousDate = new Date(previousTime);

        let dateInt = parseInt(this.Sugar.date2string(previousDate, "YYYYMMDD"));
        this.log.info(dateInt);

        // 获得三天内的大宗交易数据
        const Sequelize = this.Sequelize;
        // 执行查询 - 查找value中dateInt大于指定日期的数据
        const rows = await this.RealtimeQuote.findAll({
            where: Sequelize.where(
                Sequelize.json('value.dateInt'),
                '>=', // 大于等于
                dateInt // 3天前的时间点
            ),
        });
        // 使用 map reduce 方法将 rows 数组每个元素的 value 字段转换为一个数组。
        const rawValues = rows.map(row => row.value);
        return rawValues;
    }

    // 获得三天内的股票的 realtime quote
    async blockTrades(args) {
        const {
            days = 5
        } = args;
        // 获得三天内的大宗交易数据
        const Sequelize = this.Sequelize;
        const daysAgo = Sequelize.literal(`DATE_SUB(NOW(), INTERVAL ${days} DAY)`);
        const blockTrades = await this.BlockTrade.findAll({
            where: Sequelize.where(
                // 将 JSON 中的交易日期字符串转换为 DATETIME 类型
                Sequelize.cast(
                    Sequelize.json('value.交易日期'), // 提取 JSON 路径
                    'DATETIME'
                ),
                '>=', // 大于等于
                daysAgo // 3天前的时间点
            ),
            // 可以选择性地对结果进行排序
            order: [[Sequelize.json('value.交易日期'), 'DESC']],
        });
        // 使用 map reduce 方法将 blockTrades 数组每个元素的 value 字段转换为一个数组。
        const recentBlockTradeValues = blockTrades.map(trade => trade.value);
        return recentBlockTradeValues;
    }


    // 同步具体某一天的大宗交易
    async getPrompts(args) {


    }


}

module.exports = CopBigTradeReport;