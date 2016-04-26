(function(module) {
  var controllerAbout = {};

  controllerAbout.index = function() {
    $('section').hide();
    $('#about').show();
  };

  module.controllerAbout = controllerAbout;
})(window);
