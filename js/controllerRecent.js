(function(module) {
  var controllerRecent = {};

  controllerRecent.index = function() {
    // var recent = new Page('RecentDataSet', 'recent', '#recent', 'recentTemplate' );
    // recent.fetchAll(function() { populate.buildIndexPage(recent); });
    $('section').hide();
    $('#recent').show();
    repos.requestRepos(repoView.index);
  };

  module.controllerRecent = controllerRecent;
})(window);
