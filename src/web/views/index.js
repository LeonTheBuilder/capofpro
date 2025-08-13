createApp({
    data: {},
    methods: {
        init: async function () {
            let self = this;
            self.initListeners();
            // EventOp.pub(IndexEventsDef.checkToken);

        },
        initListeners: function () {
            let self = this;
        },
        downloadDiv: function () {
            // 获取目标div元素
            const targetDiv = document.getElementById('testId');
            // 使用dom-to-image转换为PNG
            domtoimage.toPng(targetDiv)
                .then(function (dataUrl) {
                    const link = document.createElement('a');
                    link.download = 'dom-screenshot.png';
                    link.href = dataUrl;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                })
                .catch(function (error) {
                    console.error('转换失败:', error);
                });
        }
    }
});