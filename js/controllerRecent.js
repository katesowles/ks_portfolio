(function(module) {
  var controllerRecent = {};

  controllerRecent.index = function() {
    $('section').hide();
    $('header').show();
    $('#recent').show();

    $('nav a').removeClass('viewing');
    $('nav #toRecent').addClass('viewing');

    $('#recent article').remove();

    repos.requestRepos(repoView.index);

  };

  module.controllerRecent = controllerRecent;
})(window);
