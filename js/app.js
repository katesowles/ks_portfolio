// hides or shows content based on nav clicks
$(document).ready(function() {
  $('#toPortfolio').click(function() {
    $('#about').hide();
    $('#myCarousel').show();
  });
  $('#toAbout').click(function() {
    $('#myCarousel').hide();
    $('#about').show();
  });
});


// window width checker below //////////////////////////////////////////////////

$(window).resize(function() {
  $('#widthChecker').text('Screen Width: ' + window.innerWidth);
});
