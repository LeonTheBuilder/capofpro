// 引入 nodemailer 模块
const nodemailer = require('nodemailer');

class MailService {
    //

    async sendMail(args) {
        try {
            const {
                //
                title,
                subject, to, template, data
            } = args;

            // 引入 nodemailer 模块
            // 创建一个传输对象，这里我们使用的是 SMTP 服务
            let transporter = nodemailer.createTransport({
                host: this.cfg.mail.host, // 邮件服务器地址 smtp.example.com
                port: this.cfg.mail.port, // 端口号
                secure: this.cfg.mail.secure, // true for 465, false for other ports
                auth: {
                    user: this.cfg.mail.user, // 发送方的邮箱账号  'your-email@example.com'
                    pass: this.cfg.mail.pass, // 这里是邮箱的授权码或者密码，根据你的邮件服务商的要求 'your-password'
                },
            });

            // 邮件内容
            const tplAbsPath = this.path.join(__dirname, 'templates', `${template}.html`);
            const tpl = this.Sugar.readFileContent(tplAbsPath);
            const mailContentHtml = this.Sugar.render(tpl, data);

            // 设置邮件选项
            let mailOptions = {
                from: `"${title}" <${this.cfg.mail.user}>`, // 发件人
                to: to, // 收件人，多个收件人可以用逗号分隔
                subject: subject, // 主题
                // text: '这是一封测试邮件', // 文本内容
                html: mailContentHtml, // HTML 内容
            };

            // 发送邮件
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    this.BizError.accident('发送邮件异常');
                }
                this.log.info('main sent');
            });
        } catch (e) {
            this.log.error(e);
            throw e;
        }
    }
}

module.exports = MailService;
