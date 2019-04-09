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