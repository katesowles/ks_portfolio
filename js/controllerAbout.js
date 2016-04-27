(function(module) {
  var controllerAbout = {};

  controllerAbout.index = function() {
    $('section').hide();
    $('#about').show();

    $('nav a').removeClass('viewing');
    $('nav #toAbout').addClass('viewing');
  };

  module.controllerAbout = controllerAbout;
})(window);
