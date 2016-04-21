(function(module) {

  var populate = {};

  populate.buildIndexPage = function () {
    // removes the active status from all but the first project slide
    $('.carousel-inner').find(function() {
      $('.active:gt(1)').removeClass('active');
    });

    // pushes each project to the carousel
    Portfolio.all.forEach(function(a){
      $('.carousel-inner').append(a.toHtml());
    });

    Recent.all.forEach(function(a){
      $('#recent').append(a.recentToHtml());
    });

  };

  // hides or shows content based on nav clicks
  $(document).ready(function() {
    $('#toPortfolio').click(function() {
      $('#about').hide();
      $('#portfolio').show();
    });
    $('#toAbout').click(function() {
      $('#portfolio').hide();
      $('#about').show();
    });
  });

  module.populate = populate;

})(window);
