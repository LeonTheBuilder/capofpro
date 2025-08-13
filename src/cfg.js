const path = require('path');
const cfgdef = require('aframework/cfgdef');
//----------------------------------------------------------------
const cfg = cfgdef();
//----------------------------------------------------------------
cfg.app.name = 'capofpro';
cfg.app.rootFolder = path.join(__dirname, '..');
const nodeModulesPath = path.join(__dirname, "..", 'node_modules');
cfg.autowire.folders = [
    __dirname,
    path.join(nodeModulesPath, "user_service"),
    path.join(nodeModulesPath, "ai_service"),
];
//----------------------------------------------------------------
cfg.web.port = 3015;
//----------------------------------------------------------------
cfg.mysql.database = 'capofpro';
cfg.mysql.serverTimezone = 'Asia/Shanghai';
//----------------------------------------------------------------
cfg.app.storageRoot = process.env.APP_STORAGE_ROOT || '/Users/chence/dev/tmp';
cfg.app.defaultLlmModel = process.env.APP_DEFAULT_LLM_MODEL || 'qwen-plus';
cfg.app.tempFolderRoot = process.env.APP_TEMP_FOLDER_ROOT || '/Users/chence/dev/tmp';
//----------------------------------------------------------------
const userServiceSet = require('user_service/src/cfgset');
userServiceSet(cfg);
//----------------------------------------------------------------
const aiServiceSet = require('ai_service/src/cfgset');
aiServiceSet(cfg);
//----------------------------------------------------------------
module.exports = cfg;
