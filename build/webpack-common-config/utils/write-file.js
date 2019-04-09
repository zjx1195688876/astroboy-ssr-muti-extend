const fs = require('fs');
const path = require('path');
const PAGE_ROUTER = require('./page-router');
const ROOT_PATH = process.cwd();
const {
  appMutiCode,
  entryClientMutiCode,
  entryServerMutiCode,
  appSpaCode,
  entryClientSpaCode,
  entryServerSpaCode
} = require('../code');

const writeFile = () => {
  if (!fs.existsSync(path.join(ROOT_PATH, `/.ssr`))) {
    fs.mkdirSync(path.join(ROOT_PATH, `/.ssr`));
  }
  
  for (let pageName in PAGE_ROUTER) {
    const PAGE_PATH = `${ROOT_PATH}/.ssr/${pageName}`;
    if (!fs.existsSync(path.join(ROOT_PATH, `/.ssr/${pageName}`))) {
      fs.mkdirSync(path.join(ROOT_PATH, `/.ssr/${pageName}`));
    }
    switch(PAGE_ROUTER[pageName].type) {
      case 'spa':
        fs.writeFileSync(`${PAGE_PATH}/app.js`, appSpaCode(pageName)); // 写app.js
        fs.writeFileSync(`${PAGE_PATH}/entry-client.js`, entryClientSpaCode(pageName)); // 写entry-client.js
        fs.writeFileSync(`${PAGE_PATH}/entry-server.js`, entryServerSpaCode(pageName)); // 写entry-server.js
        break;
      default:
        fs.writeFileSync(`${PAGE_PATH}/app.js`, appMutiCode(pageName)); // 写app.js
        fs.writeFileSync(`${PAGE_PATH}/entry-client.js`, entryClientMutiCode(pageName)); // 写entry-client.js
        fs.writeFileSync(`${PAGE_PATH}/entry-server.js`, entryServerMutiCode(pageName)); // 写entry-server.js
        break;
    }
  }
};


module.exports = writeFile;