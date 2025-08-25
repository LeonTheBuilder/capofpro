// 参考资料  https://akshare.akfamily.xyz/index.html
class CopService {

    // --------------------------------------------------------------------------------------
    // 当前天的 int8
    currentDateInt() {
        return parseInt(this.Sugar.curDate2String("YYYYMMDD"));
    }

    // 调用 aktool
    async callAkTool(args) {

        const {
            api,
            params
        } = args;
        //

        const response = await this.http.get({
            url: `http://127.0.0.1:8080/api/public/${api}`,
            headers: {
                'Accept': 'application/json',
            },
            params
        });

        // todo check response error

        const data = response.data;
        return data;
    }

    // --------------------------------------------------------------------------------------
    // 标记交易日同步
    async markTradeDaySync(args) {
        const {
            markType,
            dateInt,
            sifStatus
        } = args;
        //
        // 记录 新的同步日期
        const id = await this.idgen.next();
        const newSyncDay = this.TradeDaySync.build({id});
        const newSyncDayParams = {
            tradeDay: dateInt,
            markType,
            sifStatus
        }
        this.log.info(newSyncDayParams);
        newSyncDay.set(newSyncDayParams);
        await newSyncDay.save();
    }

    // 获取 symbol 的需要同步的下一个交易日
    async nextTradeDaySync(args) {
        //
        const {
            markType
        } = args;
        // 已同步的 day
        let lastSyncDay = await this.TradeDaySync.max('tradeDay', {
            where: {
                markType
            }
        });

        const curDateInt = this.currentDateInt();
        //
        this.BizError.accidentIf(lastSyncDay > curDateInt, "bug，不应该同步到未来日期");

        // 如果没有匹配记录，会返回 null
        if (!lastSyncDay) {
            // rules 查询 TradeDay  表 id 比 curDateInt 小的 14条记录，按照 id 倒序
            const tradeDays = await this.TradeDay.findAll({
                where: {
                    id: {
                        [this.Sequelize.Op.lt]: curDateInt
                    }
                },
                order: [
                    ['id', 'DESC']
                ],
                limit: 3
            });

            this.BizError.accidentIf(!tradeDays || tradeDays.length < 3, "需要手动更新交易日数据");
            lastSyncDay = tradeDays[2].id;
        }
        this.log.info(`lastSyncDay of ${markType} is ${lastSyncDay}`);

        // 查询 TradeDay 比 lastSyncDay 大的第一个记录的 id
        const nextTradeDay = await this.TradeDay.findOne({
            where: {
                id: {
                    [this.Sequelize.Op.gt]: lastSyncDay
                },
            },
            order: [
                ['id', 'ASC']
            ],
        });

        this.BizError.accidentIf(!nextTradeDay, "没有有效的同步日期，需要【手动更新交易日数据】");

        if (nextTradeDay.id > curDateInt) {
            // rules 如何下一个交易还没到，则返回 null
            this.log.info(`${markType} nextTradeDay 超过当前日期,返回 null ${nextTradeDay.id} > ${curDateInt}`);
            return null;
        }
        // 返回
        return nextTradeDay.id;
    }


    async catchUpTradeDays(args) {
        const {
            markType,
            syncFunc,
            funcArgs
        } = args;

        //
        const curDateInt = this.currentDateInt();

        while (true) {
            // here
            const nextTradeDayInt = await this.nextTradeDaySync({
                markType
            });

            if (!nextTradeDayInt) {
                break;
            }

            if (nextTradeDayInt === curDateInt) {
                // rules 判断当前时间是否是在 16点之后
                const HH = this.Sugar.curDate2String("HH");
                if (parseInt(HH) < 16) {
                    this.log.info(`${markType} 当前天时间未到16点,返回 ${HH} < 16`);
                    break;
                }
            }

            this.log.info(`同步 ${markType} ${nextTradeDayInt} 的交易数据`);
            // rules 不论如何就同步一次
            let sifStatus = this.SifStatus.s;
            try {
                funcArgs.dateInt = nextTradeDayInt;
                await syncFunc(funcArgs);
            } catch (e) {
                this.log.error(e);
                sifStatus = this.SifStatus.f;
            }

            //
            await this.markTradeDaySync({
                markType,
                dateInt: nextTradeDayInt,
                sifStatus
            });

            //
            await this.Sugar.sleepRandom(5 * 1000, 15 * 1000);
        }
    }

    // 获取最后一个交易日，如果 markType 已经在此交易日执行完了 func，则不执行，否则执行。
    async syncByRecentTradeDay(args) {
        //
        const {
            markType,
            syncFunc,
            funcArgs
        } = args;
        //
        const curDateInt = this.currentDateInt();
        //
        const tradeDays = await this.TradeDay.findAll({
            where: {
                id: {
                    [this.Sequelize.Op.lte]: curDateInt
                }
            },
            order: [
                ['id', 'DESC']
            ],
            limit: 2
        });
        //
        let targetDateInt = null;
        //
        const HH = this.Sugar.curDate2String("HH");
        if (parseInt(HH) < 16) {
            targetDateInt = tradeDays[1].id;
        } else {
            targetDateInt = tradeDays[0].id;
        }
        //
        const markStr = `${markType}_${targetDateInt}`;
        const mark = await this.Mark.findByPk(markStr);
        if (mark) {
            this.log.info(`mark exist ${markStr} `);
            return;
        }
        funcArgs.dateInt = targetDateInt;
        await syncFunc(funcArgs);
        //
        const newMark = this.Mark.build({id: markStr});
        await newMark.save();
    }

}

module.exports = CopService;