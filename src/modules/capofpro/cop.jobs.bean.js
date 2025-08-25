class CopJobs {

    // ---------------------------------------------------------------------------------------------------
    async startWorkerForCopBigTradeService() {
        this.Sugar.schedule(
            async () => this.copBigTradeService.syncData(),
            60 * 1000 * 5  //
        );
    }

    async startWorkerForCopDepTradeService() {
        this.Sugar.schedule(
            async () => this.copDepTradeService.syncData(),
            60 * 1000 * 5  //
        );
    }

    async startWorkerForCopHsgtFundFlowSummaryService() {
        this.Sugar.schedule(
            async () => this.copHsgtFundFlowSummaryService.syncData(),
            60 * 1000 * 5  //
        );
    }

    async startWorkerForCopMarginAccountService() {
        this.Sugar.schedule(
            async () => this.copMarginAccountService.syncData(),
            60 * 1000 * 5  //
        );
    }

    async startWorkerForCopRealtimeQuotesService() {
        this.Sugar.schedule(
            async () => this.copRealtimeQuotesService.syncData(),
            60 * 1000 * 5  //
        );
    }


}

module.exports = CopJobs;