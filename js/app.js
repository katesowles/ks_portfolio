(function(module) {

  function Project (opts) {
    this.title = opts.title;
    this.category = opts.category;
    this.clientUrl = opts.clientUrl;
    this.linkDesc = opts.linkDesc;
    this.imageSrc = opts.imageSrc;
    this.description = opts.description;
    this.publishedOn = opts.publishedOn;
  };

  Project.all = [];

  Project.prototype.toHtml = function() {
    var source = $('#projectTemplate').html();
    var template = Handlebars.compile(source);

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

    return template(this);
  };

  Project.loadAndSort = function(rawData) {
    // sorts the data in order of published on, most recent at top
    rawData.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    });

    // loads the now-sorted data via .map()
    Project.all = rawData.map(function(item) {
      return new Project(item);
    });
  };

  Project.fetchAll = function(rawData) {
    // if the data is already in localStorage, parse it and pull it back
    if (localStorage.rawData) {
      Project.loadAndSort(JSON.parse(localStorage.rawData));
      projectView.buildIndexPage();
    } else {
    // if the data isn't in localStorage, stringify and put it there.
      var newData = $.getJSON( 'js/portfolioItems.json' );
      newData.done(function (data) {
        Project.loadAndSort(data);
        localStorage.rawData = JSON.stringify(data);
        projectView.buildIndexPage();
      });
    }
  };

  ////////////////////////////////////////////////////////////////////////////////

  var projectView = {};

  projectView.buildIndexPage = function () {
    // removes the active status from all but the first project slide
    $('.carousel-inner').find(function() {
      $('.active:gt(1)').removeClass('active');
    });

    // pushes each project to the carousel
    Project.all.forEach(function(a){
      $('.carousel-inner').append(a.toHtml());
    });
  };

  ////////////////////////////////////////////////////////////////////////////////

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

  module.Project = Project;

})(window);
