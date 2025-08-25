createApp({
    data: {
        reports: [],
        targetReport: {},
        prompt: "",
    },
    methods: {
        init: async function () {
            let self = this;
            self.initListeners();
            EventOp.pub(CommonEventsDef.page_ready);
        },
        initListeners: function () {
            let self = this;
            EventOp.sub(CommonEventsDef.page_ready, [self.listReports]);
        },
        listReports: async function () {
            let self = this;
            //
            const res = await copReportManager.listReports();
            errMsgIf(res);
            //
            self.reports = res.data;
        },
        downloadDataFile: async function () {
            let self = this;
            const beanName = self.targetReport.name;
            console.log(beanName);
            if (!beanName) {
                toastError("请选择报告");
                return;
            }
            await download(`/cop/big.trade.report/${beanName}/generate.data.file`, beanName + ".md");
        },
        copyPrompts: async function () {
            let self = this;
            const beanName = self.targetReport.name;
            console.log(beanName);
            if (!beanName) {
                toastError("请选择报告");
                return;
            }
            const bean = eval(beanName);
            const res = await bean.getPrompts();
            errMsgIf(res);
            console.log(res);
            self.prompt = res.data;
            copy2Clipboard(self.prompt);
        },
        downloadImage: async function () {
            await captureAndDownload("dzjyListContainer");
        },
    }
});