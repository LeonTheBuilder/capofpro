const loadContext = require('../../../loadcontext');

it('sendMail', async () => {

    const a = await loadContext();
    const mailService = a.beans.mailService;
    const title = 'xeye.me'
    const subject = '测试邮件';
    const to = 'leoooon@foxmail.com';
    const template = 'loginUrl';
    const data = {loginUrl: 'xxxx'};

    await mailService.sendMail({
        title,
        subject,
        to,
        template,
        data,
    });
});
