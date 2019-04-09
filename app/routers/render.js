/**
 * 渲染页面
 */
module.exports = [
  ['GET', '/detail', 'render.RenderController', 'getDetailHtml'],
  ['GET', '/master-detail', 'render.RenderController', 'getMasterDetailHtml'],
  ['GET', '/master-detail2', 'render.RenderController', 'getMasterDetailHtml2'],
  ['GET', '/test-spa/index', 'render.RenderController', 'testSpaHtml1'],
  ['GET', '/test-spa/detail', 'render.RenderController', 'testSpaHtml2'],
  ['GET', '/test-spa/test-page', 'render.RenderController', 'testSpaHtml3']
];
