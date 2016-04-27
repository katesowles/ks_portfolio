(function(module) {

  var populate = {};

  populate.buildIndexPage = function (page) {
    // removes the active status from all but the first project slide
    $('.carousel-inner').find(function() {
      $('.active:gt(1)').removeClass('active');
    });
    // pushes each project to the container on the page it belongs in
    page.items.forEach(function(a){
      $(page.location).append(a.toHtml(page.templateId));
    });
  };


  var portfolio = new Page('PortfolioDataSet', 'portfolio', '.carousel-inner', 'portfolioTemplate');
  portfolio.fetchAll(function() { populate.buildIndexPage(portfolio); });

  // recent needs to use an $.ajax request as opposed to the recent.json file to pull in the data...
  var recent = new Page('RecentDataSet', 'recent', '#recent', 'recentTemplate');
  recent.fetchGithub(function() { populate.buildIndexPage(recent); });

  module.populate = populate;
  // module.recent = recent;

})(window);
