'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/api/getDiscList', controller.home.getDiscList);
  router.get('/api/getCdInfo', controller.home.getCdInfo);
  router.get('/api/lyric', controller.home.lyric);
  router.post('/api/getPurlUrl', controller.home.getPurlUrl);
  router.get('/api/search', controller.home.search);
  router.get('/api/getTopBanner', controller.home.getTopBanner);
};
