(function(module) {
  var repoView = {};

  var ui = function() {
    var $recent = $('#recent');

    $recent.show();
  };

  var render = Handlebars.compile($('#recentTemplate').html());

  repoView.index = function(owner) {
    ui();

    $('#recent').append(
      repos.owned(owner).map(render)
    ).hide();
  };

  module.repoView = repoView;
})(window);
