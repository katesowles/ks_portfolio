(function(module) {
  var repoView = {};

  var ui = function() { // shows "recent" section upon calling ui()
    var $recent = $('#recent');
    $recent.empty().show();
  };


  var render = Handlebars.compile($('#recentTemplate').html()); // calls to fill in handlebars

  repoView.index = function() {
    ui();
    console.log('repos.owned()', repos.owned());
    $('#recent').append( // fills filtered results from repos.owned into the #recent section of page
      repos.owned().map(render)
    ).hide(); // hides recent repos from appearing in the portfolio section when it all loads initially
  };

  module.repoView = repoView;
})(window);
