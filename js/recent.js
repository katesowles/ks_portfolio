(function(module) {

  function Recent (opts) {
    this.title = opts.title;
    this.category = opts.category;
    this.taglink = opts.taglink;
    this.imageSrc = opts.imageSrc;
    this.pubDate = opts.pubDate;
    this.caption = opts.caption;
  };

  Recent.all = [];

  Recent.prototype.toHtml = function() {
    var source = $('#recentTemplate').html();
    var template = Handlebars.compile(source);

    return template(this);
  };

  Recent.loadAndSort = function(recentRawData) {
    recentRawData.sort(function(a,b) {
      return (new Date(b.pubDate)) - (new Date(a.pubDate));
    });

    Recent.all = recentRawData.map(function(recentItem) {
      return new Recent(recentItem);
    });
  };

  Recent.fetchAll = function(recentRawData, callback) {
    // if the data is already in localStorage, parse it and pull it back
    if (localStorage.recentRawData) {
      Recent.loadAndSort(JSON.parse(localStorage.recentRawData));
      callback;
    } else {
    // if the data isn't in localStorage, stringify and put it there.
      var newRecentData = $.getJSON( 'data/recent.json' );
      newRecentData.done(function (recentData) {
        Recent.loadAndSort(recentData);
        localStorage.recentRawData = JSON.stringify(recentData);
        callback;
      });
    }
  };

  module.Recent = Recent;

})(window);
