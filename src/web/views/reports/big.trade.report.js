createApp({
    data: {},
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
            //
            const res = await reportService.getBigTradeReport();
            errMsgIf(res);
            console.log(res);
        }
    }
});