# 安装依赖
PUPPETEER_SKIP_DOWNLOAD=true npm install
PUPPETEER_SKIP_DOWNLOAD=true npm update aframework
PUPPETEER_SKIP_DOWNLOAD=true npm update user_service
PUPPETEER_SKIP_DOWNLOAD=true npm update ai_service
PUPPETEER_SKIP_DOWNLOAD=true npm run dev

ENV_FILE_PATH=/Users/chence/dev/devops/doctalks.env npm run dev
ENV_FILE_PATH=/Users/chence/dev/devops/doctalks.env npm run dev


# 设计
- base
  - llm : 提供文字大模型的基础能力,记录 token 用量
  - mail : 发送邮件
- fetcher 专门用来抓取数据
  - fund 数据
  - 新闻数据
- data 用来存储和提供数据
- analyzer 
  - 生成通用报告
  - 判断是否需要生成“加急”的报告，比如有新闻报告懂王有搞大事情了
- editor 
  - 生成抖音小红书微博的图文内容
  - 生成 email 发送的文字内容
- user
  - 用户注册登录
  - 角色管理
  - 用户产品判断和管理