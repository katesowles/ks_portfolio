(function(module) {
  var routes = {};

  routes.setMapping = function () {
    page.base('/');
    page('', controllerPortfolio.index);
    page('recent', controllerRecent.index);
    page('about', controllerAbout.index);

    page();
  };

  routes.setMapping();

  module.routes = routes;

})(window);
