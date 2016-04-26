(function(module) {
  var repoView = {};

  var ui = function() {
    var $recent = $('#recent');
    $recent.empty();
    $recent.show();
  };

  var render = Handlebars.compile($('#recentTemplate').html());

  repoView.index = function() {
    ui();

    $('#recent').append(
      repos.owned(owner).map(render)
    );
  };

  module.repoView = repoView;
})(window);
