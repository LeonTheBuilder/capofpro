const scrape = require('website-scraper');

scrape({
    urls: ['https://developers.binance.com/docs/derivatives'],
    urlFilter: function (url) {
        // 确保只抓取提供的URL下的资源
        return url.indexOf('https://developers.binance.com/docs/derivatives') === 0;
    },
    http: {
        retry: 3, // 设置重试次数为3次
    },
    recursive: true, // 如果想要抓取页面内的链接指向的其他页面，请设置为true
    maxDepth: 1, // 抓取深度，设置为1表示只抓取初始页面
    prettifyUrls: true,
    filenameGenerator: 'bySiteStructure',
    directory: './binance-docs', // 下载内容保存的目录
    ignoreRobotsTxt: true,
}).then((result) => {
    console.log('Scraping finished!');
}).catch((err) => {
    console.error(err);
});