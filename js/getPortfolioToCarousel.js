var projects = [];

function Project (opts) {
  for (key in opts) this[key] = opts[key];
};

Project.prototype.toHtml = function() {

  var source = $('#projectTemplate').html();
  var template = Handlebars.compile(source);

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  return template(this);

};

// sorts the data in order of published on, most recent at top
rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// pushes each completed project to the project array
rawData.forEach(function(ele) {
  projects.push(new Project(ele));
});

// removes the active status from all but the first project slide
$('.carousel-inner').find(function() {
  $('.active:gt(1)').removeClass('active');
});

// adds a bubble nav dot for each project in the carousel
$('.carousel-inner').find(function() {
  rawData.forEach(function(b) {
    $('ol').append('<li data-target="#myCarousel" data-slide-to="' + (b - 1) + '"></li>');
  });
});

// removed the last, unused bubble nav bubble
$('.carousel-indicators').find(function() {
  $('li:last-child').remove();
});

// pushes each project to the carousel
projects.forEach(function(a){
  $('.carousel-inner').append(a.toHtml());
});
