/**
 * 通过 TradeDay 同步, 在 16点之后同步仅一次
 * 接口 返回的是指定日期的数据。。数据内带有日期字段。
 */
class CopDepTradeService {
    // --------------------------------------------------------------------------------------
    // 同步每日活跃营业部
    async syncData() {
        //
        const markType = "DailyActiveDepartments";
        await this.copService.catchUpTradeDays({
            markType,
            syncFunc: this.fetchSaveData.bind(this),
            funcArgs: {},
        });
    }

    async fetchSaveData(args) {
        //
        const {
            dateInt
        } = args;
        //
        const data = await this.copService.callAkTool({
            api: "stock_lhb_hyyyb_em",
            params: {
                start_date: dateInt,
                end_date: dateInt
            }
        });
        for (const item of data) {
            const id = await this.idgen.next();
            const departmentActivity = this.DepartmentActivity.build({id});
            departmentActivity.value = item;
            await departmentActivity.save();
        }
    }

}

module.exports = CopDepTradeService;