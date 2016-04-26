(function(module) {
  var controllerRecent = {};

  controllerRecent.index = function() {
    var recent = new Page('RecentDataSet', 'recent', '#recent', 'recentTemplate' );
    recent.fetchAll(function() { populate.buildIndexPage(recent); });
    $('section').hide();
    $('#recent').show();
  };

  module.controllerRecent = controllerRecent;
})(window);
