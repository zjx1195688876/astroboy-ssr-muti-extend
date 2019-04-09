const fs = require('fs');
const path = require('path');
const ROOT_PATH = process.cwd();
const config = require('../../webpack.config');

const PAGES_PATH = config.pages ? config.pages : path.join(ROOT_PATH, '/client/pages');
let PAGE_ROUTER = {};
let HAS_SSR_CONFIG = false;

const checkPage = (page) => {
  const SSR_CONFIG = require(`${ROOT_PATH}/client/ssr-config/config.js`);
  let priority = SSR_CONFIG.priority === 'exclude' ? 'exclude' : 'include'; // 优先级
  let bool = false, type = 'muti';
  if (priority === 'exclude') { // exclude优先级更高
    const exclude = SSR_CONFIG.exclude || [];
    const include = SSR_CONFIG.include || [];
    bool = true;
    exclude.map(item => {
      if (item.path === page) {
        bool = false;
        type = item.type || 'muti';
      }
    });
    include.map(item => {
      if (item.path === page) {
        bool = true;
        type = item.type || 'muti';
      }
    });
  } else { // 否则都认为是include
    const include = SSR_CONFIG.include || [];
    const exclude = SSR_CONFIG.exclude || [];
    if (include.length > 0) {
      include.map(item => {
        if (item.path === page) {
          bool = true;
          type = item.type || 'muti';
        }
      });
    } else if (exclude.length > 0) {
      bool = true;
      exclude.map(item => {
        if (item.path === page) {
          bool = false;
          type = item.type || 'muti';
        }
      });
    }
  }

  return {
    bool,
    type
  };
};

const getPageRouter = () => {
  // 寻找多页的入口，只支持两级
  const pages = fs.readdirSync(PAGES_PATH);
  pages.map(page => {
    if (/\.vue/.test(page)) {
      console.error('页面文件目录不规范');
    } else {
      const childPages = fs.readdirSync(path.join(PAGES_PATH, `${page}`));
      const len = childPages.length;
      let hasIndex = false;
      for (let i = 0; i < len; i++) {
        if (/(index|app|App).vue/.test(childPages[i])) {
          hasIndex = true;
          break;
        }
      }
      // 看下是否有ssr-config文件，有的话可能开启了部分页面服务端渲染的功能
      if (fs.existsSync(path.join(ROOT_PATH, `/client/ssr-config/config.js`))) {
        HAS_SSR_CONFIG = true;
      }
      let bool, type = 'muti';
      if (HAS_SSR_CONFIG) { // 有配置文件，需要读配置文件
        bool = hasIndex && checkPage(page).bool;
        type = checkPage(page).type;
      } else { // 否则，全量开启服务端渲染，只要有对应的页面入口，就可以进入渲染
        bool = hasIndex;
      }
      if (bool) {
        let router = {};
        router[page] = {
          dir: path.join(PAGES_PATH, `${page}`),
          type
        };
        PAGE_ROUTER = Object.assign({}, PAGE_ROUTER, router);
      }
    }
  });

  return PAGE_ROUTER;
};

module.exports = getPageRouter();
