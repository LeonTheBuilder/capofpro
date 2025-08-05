class TongHuaShunWorker {
    //
    _chrome = null;

    //
    async startWorkerForFetch() {

    }

    async fetch() {
        // 先爬取龙虎榜（要表格所有字段）
        await this.stockZdfphFetch();
        // 在爬取个股资金流（只要表格的流入资金、流出资金、成交额）
        await this.stockGgzjlFetch();
        // 大宗交易
        await this.stockDzjyFetch();
    }


    // 个股资金流
    async stockGgzjlFetch() {
        //
        const func = this.tongHuaShunStockGgzjlFetch.instructs;
        await this.chromeByFunc(func);
    }

    // 龙虎榜：涨跌幅排行
    async stockZdfphFetch() {
        //
        const func = this.tongHuaShunStockZdfphFetch.instructs;
        await this.chromeByFunc(func);
    }

    // 大宗交易
    async stockDzjyFetch() {
        //
        const func = this.tongHuaShunStockDzjyFetch.instructs;
        await this.chromeByFunc(func);
    }

    async chromeByFunc(func) {
        const instructs = await this.instructsBuilder.func2instructs({func});
        const chrome = await this.getChrome();
        await chrome.executeInstructs(instructs);
    }


    async getChrome() {
        if (!this._chrome) {
            const args = {
                userDataPath: this.path.join(this.cfg.app.storageRoot, "tonghuashun"),
                self: this
            };
            const chrome = new this.Chrome(args);
            await chrome.start();
            this.chrome = chrome;
        }
        return this.chrome;
    }

}


module.exports = TongHuaShunWorker;