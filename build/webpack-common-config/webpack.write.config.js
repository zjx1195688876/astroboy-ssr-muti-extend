const fs = require('fs');
const path = require('path');
const merge = require('webpack-merge');
const CreateFileWebpack = require('create-file-webpack');
const { PAGE_ROUTER, ROOT_PATH } = require('./utils');
const { appCode, entryClientCode, entryServerCode } = require('./code');

if (!fs.existsSync(path.join(ROOT_PATH, `/.ssr`))) {
  fs.mkdirSync(path.join(ROOT_PATH, `/.ssr`));
}

let webpackWriteMap = {};
for (let pageName in PAGE_ROUTER) {
  let app_options = {
    path: path.join(ROOT_PATH, `/.ssr/${pageName}`),
    fileName: 'app.js',
    content: appCode(pageName)
  };
  let entry_client_options = {
    path: path.join(ROOT_PATH, `/.ssr/${pageName}`),
    fileName: 'entry-client.js',
    content: entryClientCode(pageName)
  };
  let entry_server_options = {
    path: path.join(ROOT_PATH, `/.ssr/${pageName}`),
    fileName: 'entry-server.js',
    content: entryServerCode(pageName)
  };

  let wConfig = merge({}, {
    plugins: [
      new CreateFileWebpack(app_options),
      new CreateFileWebpack(entry_client_options),
      new CreateFileWebpack(entry_server_options)
    ]
  });
  webpackWriteMap[pageName] = {writeConfig: wConfig};
}

module.exports = webpackWriteMap;