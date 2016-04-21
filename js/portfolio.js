(function(module) {

  function Portfolio (opts) {
    this.title = opts.title;
    this.category = opts.category;
    this.clientUrl = opts.clientUrl;
    this.linkDesc = opts.linkDesc;
    this.imageSrc = opts.imageSrc;
    this.description = opts.description;
    this.publishedOn = opts.publishedOn;
  };

  Portfolio.all = [];

  Portfolio.prototype.toHtml = function() {
    var source = $('#portfolioTemplate').html();
    var template = Handlebars.compile(source);

    this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
    this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

    return template(this);
  };

  Portfolio.loadAndSort = function(rawData) {
    // sorts the data in order of published on, most recent at top
    rawData.sort(function(a,b) {
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    });

    // loads the now-sorted data via .map()
    Portfolio.all = rawData.map(function(item) {
      return new Portfolio(item);
    });
  };

  Portfolio.fetchAll = function(rawData) {
    // if the data is already in localStorage, parse it and pull it back
    if (localStorage.rawData) {
      Portfolio.loadAndSort(JSON.parse(localStorage.rawData));
      populate.buildIndexPage();
    } else {
    // if the data isn't in localStorage, stringify and put it there.
      var newData = $.getJSON( 'data/portfolio.json' );
      newData.done(function (data) {
        Portfolio.loadAndSort(data);
        localStorage.rawData = JSON.stringify(data);
        populate.buildIndexPage();
      });
    }
  };

  module.Portfolio = Portfolio;

})(window);
