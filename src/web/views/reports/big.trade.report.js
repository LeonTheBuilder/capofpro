createApp({
    data: {
        dateInt: null,
        instMap: {},
        stockMap: {},
        bigTradesList: [],
    },
    methods: {
        init: async function () {
            let self = this;
            self.initListeners();
            EventOp.pub(CommonEventsDef.page_ready);
        },
        initListeners: function () {
            let self = this;
            EventOp.sub(CommonEventsDef.page_ready, [self.getBigTradeReportData]);
        },
        getBigTradeReportData: async function () {
            let self = this;
            //
            const res = await reportService.getBigTradeReport();
            errMsgIf(res);
            //
            const instMap = {};
            for (const inst of res.data.insts) {
                instMap[inst.id] = inst;
            }
            self.instMap = instMap;
            //
            const stockMap = {};
            for (const stock of res.data.stocks) {
                stockMap[stock.id] = stock;
            }
            self.stockMap = stockMap;
            //
            self.bigTradesList = res.data.bigTradesList;
            self.dateInt = res.data.dateInt;
        },
        downloadImage: async function () {
            await captureAndDownload("dzjyListContainer");
        },
    }
});