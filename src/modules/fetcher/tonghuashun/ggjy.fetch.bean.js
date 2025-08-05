// todo 高管及关联人持股
class TongHuaShunStockGgjyFetch {
    //
    isFetch = true;

    async onTableData(args) {

        //
        const {
            tableData
        } = args;
        //
        const {
            rowList
        } = tableData;
        //
        for (const row of rowList) {
            // 跳过长度为0
            if (row.length === 0) {
                continue;
            }
            const [
                //
                _1,
                dateStr, code, title, price, tradePrice, tradeVolumeStr,
                _2,
                instBuy, instSell,
            ] = row;
            //   '3',
            //   '2025-08-01',
            //   '000032',
            //   '深桑达A',
            //   '24.77',
            //   '24.18',
            //   '826.04',
            //   '-2.38%',
            //   '机构专用',
            //   '平安证券股份有限公司四川分公司'
            //
            const stockId = await this.productService.upsertStock({
                code, title, price,
            });
            //
            const instBuyId = await this.subjectService.upsertSecurityBusinessDepartment({title: instBuy});
            const instSellId = await this.subjectService.upsertSecurityBusinessDepartment({title: instSell});
            //

            const tradeDate = this.Sugar.string2date(dateStr, 'YYYY-MM-DD');
            const dateIntStr = this.Sugar.date2string(tradeDate, 'YYYYMMDD');
            const dateInt = parseInt(dateIntStr);
            const amount = parseFloat(tradeVolumeStr) * 10000;

            await this.stateService.upsertStockBigTrade({
                stockId,
                dateInt,
                price: tradePrice,
                amount,
                instBuyId,
                instSellId,
            });
        }

    }

    async instructs() {
        // 龙虎榜（涨跌幅排行）
        await gotoUrl('https://data.10jqka.com.cn/market/dzjy/');
        await sleepRandom(3000, 4000);
        // 等待加载完成
        await idle();

        const tableData = await page.evaluate(() => {

            const tableSelector = '#J-ajax-main > table';

            //
            const table = document.querySelector(tableSelector);
            const headers = table.querySelectorAll('th');

            const headerTextList = [];
            for (const header of headers) {
                const text = header.textContent.trim();
                headerTextList.push(text);
            }
            //
            const rows = Array.from(table.querySelectorAll('tr'));
            let isFirst = true;
            const rowList = [];
            for (const row of rows) {
                if (isFirst) {
                    isFirst = false;
                    continue;
                }
                const cells = Array.from(row.querySelectorAll('td'));
                const cellTextList = [];
                for (const cell of cells) {
                    const text = cell.textContent.trim();
                    cellTextList.push(text);
                }
                rowList.push(cellTextList);
            }

            return {
                headerTextList,
                rowList
            };
        });

        await self.tongHuaShunStockGgjyFetch.onTableData({tableData});
    }

}


module.exports = TongHuaShunStockGgjyFetch;