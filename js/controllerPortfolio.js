(function(module) {
  var controllerPortfolio = {};

  controllerPortfolio.index = function() {
    var portfolio = new Page('PortfolioDataSet', 'portfolio', '.carousel-inner', 'portfolioTemplate');
    portfolio.fetchAll(function() { populate.buildIndexPage(portfolio); });

    $('section').hide();
    $('#portfolio').show();
  };

  module.controllerPortfolio = controllerPortfolio;
})(window);
