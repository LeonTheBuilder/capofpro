class IndexEventsDef {
    static checkToken = 'checkToken';
    static serverEvent = 'serverEvent';
    static siteChanged = 'siteChanged';
    static sitesChanged = 'sitesChanged';
}

const RequestTypes = Object.freeze({
    downloadUrl: 'downloadUrl',
    ingestSite: 'ingestSite'
});


const UserEventTypes = Object.freeze({
    siteCreated: 'siteCreated',
    //
    siteDownloadInit: 'siteDownloadInit',
    siteDownloadSuccess: 'siteDownloadSuccess',
    siteDownloadFail: 'siteDownloadFail',
    pageDownloading: 'pageDownloading',
    pageDownloaded: 'pageDownloaded',
    //
    extractSinglePageContents: 'extractSinglePageContents',
    extractCommonContentTasks: 'extractCommonContentTasks',
    executeCommonContentTask: 'executeCommonContentTask',
    extractApiContentTasks: 'extractApiContentTasks',
    executeApiContentTask: 'executeApiContentTask',
    //
    siteIngestSuccess: 'siteIngestSuccess',
    siteIngestFail: 'siteIngestFail',
});


createApp({
    data: {
        siteUrl: null,
        guessedSites: [],
        allSites: [],
        // ------------------------------
        userEventMessage: null,
        siteId: null,
        site: {},
        confirm: "null",
        site2delete: null,
        singleIngestText: null,
    },
    methods: {
        init: async function () {
            let self = this;
            self.initListeners();
            EventOp.pub(IndexEventsDef.checkToken);

        },
        initListeners: function () {
            let self = this;
            EventOp.sub(IndexEventsDef.checkToken, [
                self.checkToken
            ]);
            EventOp.sub(CommonEventsDef.page_ready, [
                self.syncEvents,
                self.getSites,
            ]);
            EventOp.sub(IndexEventsDef.siteChanged, [
                self.getSite,
            ]);
            EventOp.sub(IndexEventsDef.sitesChanged, [
                self.getSites,
            ]);
            // 后台事件处理
            EventOp.sub(IndexEventsDef.serverEvent, [
                self.onServerEvents,
            ]);


        },
        // --------------------------------------------------------------------
        checkToken: async function () {
            const res = await appUserService.checkToken();
            if (!isOk(res)) {
                await appUserService.issueAnonymousToken();
            }
            EventOp.pub(CommonEventsDef.page_ready);
        },
        // ----------------------------------------------------------------------------
        syncEvents: async function () {
            console.log('syncEvents');
            let self = this;
            while (true) {
                try {
                    const res = await bizEventQueue.popUserEvents();
                    if (isOk(res)) {
                        const eventJsonStr = res.data;
                        if (eventJsonStr) {
                            const eventJson = JSON.parse(eventJsonStr);
                            const {
                                userId,
                                requestType,
                                params,
                                sifStatus
                            } = eventJson;
                            // 事件处理
                            EventOp.pub(IndexEventsDef.serverEvent, eventJson);
                            //
                        } else {
                            await sleep(2000);
                        }
                    } else {
                        await sleep(3000);
                    }

                } catch (e) {
                    console.error(e);
                    // sleep 2  seconds
                    await sleep(3000);
                }

            }
        },
        onServerEvents: async function (eventJson) {
            let self = this;
            const {
                userId,
                requestType,
                userEventType,
                params,
                sifStatus
            } = eventJson;
            //
            console.log(eventJson);
            // self.userEventMessage = requestType || userEventType;
            //
            const resMock = {
                code: sifStatus === 1 ? "OK" : "ERROR"
            };
            //
            if (requestType) {
                switch (requestType) {
                    case RequestTypes.downloadUrl:
                        if (params.sifStatus === 'f') {
                            self.userEventMessage = '页面下载失败, 点击开始按钮重试.';
                        }
                        break;
                    case RequestTypes.ingestSite:
                        if (params.sifStatus === 'f') {
                            self.userEventMessage = 'Ingest 失败,点击开始按钮重试.';
                        }
                        break;
                    default:
                        self.userEventMessage = requestType;
                        break;
                }
            } else if (userEventType) {
                switch (userEventType) {
                    case UserEventTypes.siteCreated:
                        self.userEventMessage = '站点已建立.';
                        await self.getSites();
                        break;
                    case UserEventTypes.pageDownloading:
                        self.userEventMessage = `${params.pageUrl} 下载中`;
                        break;
                    case UserEventTypes.pageDownloaded:
                        self.userEventMessage = `${params.pageUrl} 已下载`;
                        break;
                    case UserEventTypes.siteDownloadFail:
                        self.userEventMessage = `页面下载失败, 点击开始按钮重试.`;
                        break;
                    case UserEventTypes.extractSinglePageContents:
                        self.userEventMessage = `提取页面内容：${params.pageTitle}`;
                        break;
                    case UserEventTypes.siteIngestSuccess:
                        self.userEventMessage = `Ingest successfully.`;
                        // await self.downloadText();
                        await self.loadText();
                        break;
                    default:
                        self.userEventMessage = userEventType;
                        break;
                }
            }

            // 更新 site
            EventOp.pub(IndexEventsDef.siteChanged);
        },

        // --------------------------------------------------------------------
        getSite: async function () {
            let self = this;
            if (!self.siteId) {
                return;
            }
            //
            if (!self.siteId) {
                return;
            }
            //
            const res = await docService.getSite({
                id: self.siteId
            });
            errMsgIf(res);
            self.site = res.data;
        },
        deleteSiteConfirm: async function (tarSite) {
            let self = this;
            self.confirm = self.deleteSite;
            self.site2delete = tarSite;
            showConfirmModal();
        },
        deleteSite: async function () {
            let self = this;
            //
            const res = await docService.deleteSite({
                id: self.site2delete.id
            });
            closeConfirmModal();
            errMsgIf(res);
            EventOp.pub(IndexEventsDef.sitesChanged);
        },
        getSites: async function () {
            let self = this;
            const res = await docService.getSites();
            errMsgIf(res);
            self.allSites = res.data;
        },
        guessSite: async function () {
            return;
            let self = this;
            if (!self.siteUrl) {
                self.guessedSites = [];
                return;
            }

            const res = await docService.guessSite({
                url: self.siteUrl
            });
            errMsgIf(res);
            self.guessedSites = res.data;
            // 判断哪一个是精准匹配
            for (const guessedSite of self.guessedSites) {
                guessedSite.exactMatch = guessedSite.url === self.siteUrl;
            }
        },
        ingestSite: async function (guessedSite) {
            let self = this;
            //
            self.siteUrl = guessedSite.url;
            await self.ingestUrl();
        },
        ingestUrl: async function () {
            let self = this;
            //
            const res = await bizController.ingestUrl({url: self.siteUrl});

            errMsgIf(res);
            self.siteId = res.data;
            EventOp.pub(IndexEventsDef.siteChanged);
            EventOp.pub(IndexEventsDef.sitesChanged);
        },
        logout: async function () {
            let self = this;
            const res = await appUserService.logout();
            errMsgIf(res);
            toastOk('已退出');
        },
        downloadText: async function () {
            let self = this;
            const downloadRes = await download(`/ingest/downloadText?siteId=${self.siteId}`, `${self.siteId}.md`);
            errMsgIf(downloadRes);
        },
        loadText: async function () {
            let self = this;
            const res = await ingestService.getSiteSingleIngest({siteId: self.siteId});
            errMsgIf(res)
            self.singleIngestText = res.data;
        },

    }
});