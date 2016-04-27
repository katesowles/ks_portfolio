(function(module) {
  var controllerRecent = {};

  controllerRecent.index = function() {
    $('section').hide();
    $('#recent').show();

    $('nav a').removeClass('viewing');
    $('nav #toRecent').addClass('viewing');

    repos.requestRepos(repoView.index);

  };

  module.controllerRecent = controllerRecent;
})(window);
