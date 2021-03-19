'use strict';

const {Controller} = require('egg');

class HomeController extends Controller {
  async getDiscList() {
    const {ctx} = this;
    const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
    const result = await ctx.curl(url, {
      method: 'GET',
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com',
      },
      data: ctx.query,
      dataType: 'json',
    });
    ctx.body = result.data;
  }

  async getCdInfo() {
    const {ctx} = this;
    const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
    const result = await ctx.curl(url, {
      method: 'GET',
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com',
      },
      data: ctx.query,
      dataType: 'json',
    });
    let ret = result.data;
    if (typeof ret === 'string') {
      const reg = /^\w+\(({.+})\)$/;
      const matches = ret.match(reg);
      if (matches) {
        ret = JSON.parse(matches[1]);
      }
    }
    ctx.body = ret;
  }

  async lyric() {
    const {ctx} = this;
    const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
    const result = await ctx.curl(url, {
      method: 'GET',
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      data: ctx.query,
      dataType: 'json',
    });
    let ret = result.data;
    if (typeof ret === 'string') {
      const reg = /^\w+\(({.+})\)$/
      const matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    ctx.body = ret;
  }

  async getPurlUrl() {
    const {ctx} = this;
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
    const result = await ctx.curl(url, {
      method: 'POST',
      headers: {
        referer: 'https://y.qq.com/',
        origin: 'https://y.qq.com',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: ctx.request.body,
      dataType: 'json',
    });
    ctx.body = result.data;
  }

  async search() {
    const {ctx} = this;
    const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
    const result = await ctx.curl(url, {
      method: 'GET',
      headers: {
        referer: 'https://c.y.qq.com/',
        host: 'c.y.qq.com'
      },
      data: ctx.query,
    });
    ctx.body = result.data;
  }

  async getTopBanner() {
    const {ctx} = this;
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
    const jumpPrefix = 'https://y.qq.com/n/yqq/album/';
    const result = await ctx.curl(url, {
      method: 'GET',
      headers: {
        referer: 'https://u.y.qq.com/',
        host: 'u.y.qq.com',
      },
      data: ctx.query,
      dataType: 'json',
    });
    const response = result.data;
    if (response.code === 0) {
      const slider = [];
      const content = response.focus.data && response.focus.data.content;
      if (content) {
        for (let i = 0; i < content.length; i++) {
          const item = content[i];
          const sliderItem = {};
          sliderItem.id = item.id;
          sliderItem.linkUrl = jumpPrefix + item.jump_info.url + '.html';
          sliderItem.picUrl = item.pic_info.url;
          slider.push(sliderItem);
        }
      }
      ctx.body = {
        code: 0,
        data: {
          slider
        }
      };
    } else {
      ctx.body = response;
    }
  }
}

module.exports = HomeController;
