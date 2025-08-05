// 涨跌幅排行
class TongHuaShunStockZdfphFetch {
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
                code, title, price,
                priceRatioDay, priceRatioDay3, priceRatioDay5,
                turnoverRatioDay, turnoverRatioDay3, turnoverRatioDay5,
                capFlowDayStr, capFlowDay3Str, capFlowDay5Str,
            ] = row;
            // 300858 科拓生物 20.40 20.00 17.91 17.65 18.07 25.17 31.87 1.77亿 1.66亿 1.40亿
            await this.productService.upsertStock({
                code, title, price,
            });
            //
            const capFlowDay = this.numberHelper.guss2wan(capFlowDayStr);
            const capFlowDay3 = this.numberHelper.guss2wan(capFlowDay3Str);
            const capFlowDay5 = this.numberHelper.guss2wan(capFlowDay5Str);
            //
            await this.stateService.upsertStockState({
                code, title, price,
                priceRatioDay, priceRatioDay3, priceRatioDay5,
                turnoverRatioDay, turnoverRatioDay3, turnoverRatioDay5,
                capFlowDay, capFlowDay3, capFlowDay5
            });
            //


        }

    }

    async instructs() {
        // 龙虎榜（涨跌幅排行）
        await gotoUrl('https://data.10jqka.com.cn/market/zdfph/');
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

        await self.tongHuaShunStockZdfphFetch.onTableData({tableData});
    }

}


module.exports = TongHuaShunStockZdfphFetch;