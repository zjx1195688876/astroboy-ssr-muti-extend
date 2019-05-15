// const path = require('path');
// const fs = require('fs');
const BaseController = require('BaseController');

class RenderController extends H5BaseController {
  async getMasterDetailHtml(ctx) {
    const html = await ctx.renderSSR('master-detail');
    ctx.body = html;
  }

  async getDetailHtml(ctx) {
    const html = await ctx.renderSSR('detail');
    ctx.body = html;
  }

  async getMasterDetailHtml2(ctx) {
    const html = await ctx.renderSSR('master-detail2');
    ctx.body = html;
  }

  async getMasterDetailHtml2(ctx) {
    const html = await ctx.renderSSR('master-detail2');
    ctx.body = html;
  }

  async testSpaHtml1(ctx) {
    const html = await ctx.renderSSR('test-spa');
    ctx.body = html;
  }

  async testSpaHtml2(ctx) {
    const html = await ctx.renderSSR('test-spa');
    ctx.body = html;
  }
  
  async testSpaHtml3(ctx) {
    const html = await ctx.renderSSR('test-spa');
    ctx.body = html;
  }

}

module.exports = RenderController;
