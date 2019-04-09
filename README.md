# 1. 目录结构
```
- build
- static
- app
  |- controller
  |- service
  |- extends // 内置对象扩展
  |- routers
  |- views // ssr的模版文件
  |- server.js // 统一启动server
- client
  |- components
  |- store
  |- pages
  |- App.vue
  |- main.js // 仅降级为客户端渲染的时候才用到
  |- router.js
  |- utils
  |- mixin
-.ssr
  |- app.js // 统一入口
  |- entry-server.js
  |- entty-client.js
- package.json
- README.md
```


## 2. 本地开发
### 1. SPA SSR:

```
纯SSR：

npm run dev // 启动server服务
npm run build-dev:client // 监听静态文件的修改 --watch
npm run build-dev:server // 监听静态文件的修改 --watch


降级为CSR：
npm run dev:degrade // 启动server服务
npm run build-dev:degrade // 监听静态文件的修改 --watch

```

### 2. MUTI SSR:

```
纯SSR：

npm run dev // 启动server服务
npm run build-dev // 监听静态文件的修改 --watch


降级为CSR：
npm run dev:degrade // 启动server服务
npm run build-dev:degrade // 监听静态文件的修改 --watch

```

## 3. 发布
```
npm run build // 同时构建SSR和降级文件
npm run start // 开启node服务
```

## 4. 新增mock的middleware，使得SSR环境下，node的请求转发也能被拦截到
```
middleware目录：app/middlewares/mock.js

使用：config/middleware.default.js
'mock': {
  priority: 100,
  enable: true,
  path: path.join(ROOT_PATH, '/app/middlewares/mock')
}

在项目根目录新增mock文件夹,mock数据读取规则：
/edu/getTeacherInfo.json -> mock/edu/getTeacherInfo.json

```

## 5. 需要ssr-plugin生效，需要在config.default.js配置路径信息，因为plugin读取相关路径(ssr-plugin可以整合SPA和MUTI的情况)
```
// SSR SPA
'ssr-plugin': {
  bundlePath: path.join(ROOT_PATH, '/static/build/server/vue-ssr-server-bundle.json'), // vue-ssr-server-bundle.json的路径
  templatePath: path.join(ROOT_PATH, '/app/views/index.html'), // 服务端渲染的模版文件路径
  clientManifestPath: path.join(ROOT_PATH, '/static/build/server/vue-ssr-client-manifest.json'), // vue-ssr-client-manifest.json的路径
  degradePath: path.join(ROOT_PATH, '/static/build/degrade/pages/index.degrade.html') // 降级为SPA的文件
}

// SSR MUTI
'ssr-plugin': {
  bundlePath: path.join(ROOT_PATH, '/static/build/server'), // vue-ssr-server-bundle.json的路径, dir
  templatePath: path.join(ROOT_PATH, '/app/views/index.html'), // 服务端渲染的模版文件路径
  clientManifestPath: path.join(ROOT_PATH, '/static/build/server'), // vue-ssr-client-manifest.json的路径, dir
  degradePath: path.join(ROOT_PATH, '/static/build/degrade') // 降级为SPA的文件, dir
}
```

## 6. client/ssr-config/config.js 可以通过配置的方式，使得工程里某些页面不走服务端渲染，没有配置文件则全量走SSR（降级逻辑依然生效）
```javascript
// 该配置文件的根目录为client/pages，没有这个配置文件则全量开启服务端渲染

/** 配置文件
 * priority: 自定义优先级，分为两种：'include'， 'exculde'
 * include: 包含在内的页面将开启SSR，默认优先级高于exclude
 *  - path: 对应文件的路径
 *  - type: SSR的类型，分为两种：'muti', 'spa'，muti: 普通的多页的页面入口，spa: 多页中的单页入口
 * exclude:  包含在内的页面不开启SSR，其余页面开启SSR，但开启SSR的页面默认type为muti
*/

const config = {
  include: [
    {
      path: 'master-detail',
      type: 'muti' // 多页
    },
    {
      path: 'detail',
      type: 'muti'
    },
    {
      path: 'test-spa',
      type: 'spa' // 多页中的单页入口
    }
  ]
};

module.exports = config;
```

