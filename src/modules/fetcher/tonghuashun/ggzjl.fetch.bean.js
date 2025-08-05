// 个股资金流
class TongHuaShunStockGgzjlFetch {
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
                _2, _3,
                capFlowInStr, capFlowOutStr,
                _4,
                turnoverDayStr,
            ] = row;
            //
            await this.productService.upsertStock({
                code, title, price,
            });
            //
            const capFlowIn = this.numberHelper.guss2wan(capFlowInStr);
            const capFlowOut = this.numberHelper.guss2wan(capFlowOutStr);
            const turnoverDay = this.numberHelper.guss2wan(turnoverDayStr);
            await this.stateService.upsertStockState({
                code, title, price,
                turnoverDay,
                capFlowIn, capFlowOut
            });
            //
        }

    }

    async instructs() {
        await gotoUrl('https://data.10jqka.com.cn/funds/ggzjl/');
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

        await self.tongHuaShunStockGgzjlFetch.onTableData({tableData});
    }

}


module.exports = TongHuaShunStockGgzjlFetch;