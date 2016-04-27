(function(module) {
  var controllerPortfolio = {};

  controllerPortfolio.index = function() {
    $('section').hide();
    $('#portfolio').show();

    $('nav a').removeClass('viewing');
    $('nav #toPortfolio').addClass('viewing');
  };

  module.controllerPortfolio = controllerPortfolio;
})(window);
