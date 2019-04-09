const appCode = (pageName) => {
const str = `
// 通用entry (universal entry)
import Vue from 'vue';
import App from '@client/pages/${pageName}/index.vue';
import { createRouter } from '@client/pages/${pageName}/router';
import { createStore } from '@client/store';
import { sync } from 'vuex-router-sync';

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp (cookie) {
  // 创建 store 实例
  const store = createStore();
  // 同步路由状态(route state)到 store
  
  // 创建 router 实例
  const router = createRouter(cookie);
  sync(store, router);

  const app = new Vue({
    // 注入 router 到根 Vue 实例
    router,
    store,
    // 根实例简单的渲染应用程序组件。
    render: h => h(App)
  });

  return {
    app,
    router,
    store
  };
};
`;
  
return str;
};

module.exports = appCode;