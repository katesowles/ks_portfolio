(function(module) {

  function Recent (opts) {
    this.title = opts.title;
    this.liveUrl = opts.liveUrl;
    this.repoUrl = opts.repoUrl;
    this.imageSrc = opts.imageSrc;
    this.description = opts.description;
  };

  Recent.all = [];

  Recent.prototype.toHtml = function() {
    var source = $('#recentTemplate').html();
    var template = Handlebars.compile(source);

    return template(this);
  };

  Recent.load = function(recentRawData) {
    Recent.all = recentRawData.map(function(recentItem) {
      return new Recent(recentItem);
    });
  };

  Recent.recentFetchAll = function(recentRawData) {
    // if the data is already in localStorage, parse it and pull it back
    if (localStorage.recentRawData) {
      Recent.load(JSON.parse(localStorage.recentRawData));
      populate.buildIndexPage();
    } else {
    // if the data isn't in localStorage, stringify and put it there.
      var newRecentData = $.getJSON( 'data/recent.json' );
      newRecentData.done(function (recentData) {
        Recent.load(recentData);
        localStorage.recentRawData = JSON.stringify(recentData);
        populate.buildIndexPage();
      });
    }
  };

  module.Recent = Recent;

})(window);
