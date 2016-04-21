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
      $('#recent').append(a.toHtml());
    });

  };

  // hides or shows content based on nav clicks
  $(document).ready(function() {
    $('#toPortfolio').click(function() {
      $('nav a').removeClass('viewing');
      $('#recent').hide();
      $('#about').hide();
      $('#portfolio').show();
      $('nav #toPortfolio').addClass('viewing');
    });
    $('#toRecent').click(function() {
      $('nav a').removeClass('viewing');
      $('#portfolio').hide();
      $('#about').hide();
      $('#recent').show();
      $('nav #toRecent').addClass('viewing');
    });
    $('#toAbout').click(function() {
      $('nav a').removeClass('viewing');
      $('#portfolio').hide();
      $('#recent').hide();
      $('#about').show();
      $('nav #toAbout').addClass('viewing');
    });
  });

  module.populate = populate;

})(window);
