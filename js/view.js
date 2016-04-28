(function(module) {

  var view = {};
  var portfolio = new Page('PortfolioDataSet', 'portfolio', '.carousel-inner', 'portfolioTemplate');

  var recent = new Page('RecentDataSet', 'recent', '#recent', 'recentTemplate');

  function Page (DatasetKey, Filename, location, templateId) {
    this.DatasetKey = DatasetKey;
    this.Filename = Filename;
    this.location = location;
    this.templateId = templateId;
    this.items = [];

    var that = this;

    // will produce an error when fetchGithub is run...to be fixed
    this.loadAndSort = function(data) {
      // console.log('this', this);
      // console.log('data', data);
      data.sort(function(a,b) {
        return (new Date(b.pubDate)) - (new Date(a.pubDate));
      });
      data.forEach(function(item) {
        that.items.push(new Item(item));
      });
    };
  }

  function Item (opts) {
    this.title = opts.title;
    this.category = opts.category;
    this.taglink = opts.taglink;
    this.imageSrc = opts.imageSrc;
    this.pubDate = opts.pubDate;
    this.caption = opts.caption;
  };

  Page.prototype.fetchAll = function(callback) {

    if (localStorage[this.DatasetKey]) {
      this.loadAndSort(JSON.parse(localStorage[this.DatasetKey]));
      // callback(arguments[1]);
      callback();
    }
    else {
      var that = this;
      var newData = $.getJSON('data/' + this.Filename + '.json');
      newData.done(function(data) {
        that.loadAndSort(data);
        localStorage[that.DatasetKey] = JSON.stringify(data);
        // callback(arguments[1]);
        callback();
      });
    }
  };

  Page.prototype.fetchGithub = function (callback) {
    if (localStorage[this.DatasetKey]) {
      this.loadAndSort(JSON.parse(localStorage[this.DatasetKey]));
      callback(arguments[1]);
    }
    else {
      var that = this;
      repos.requestRepos(function () {
        var newData = repos.owned();
        newData.forEach(function(data) {
          that.loadAndSort(data);
          localStorage[that.DatasetKey] = JSON.stringify(data);
          callback(arguments[1]);
        });
      });
    }
  };

  Item.prototype.toHtml = function(templateId) {
    var source = $('#' + templateId).html();
    var template = Handlebars.compile(source);
    return template(this);
  };

  view.buildIndexPage = function (page) {
    // removes the active status from all but the first project slide
    $('.carousel-inner').find(function() {
      $('.active:gt(1)').removeClass('active');
    });
    // pushes each project to the container on the page it belongs in
    page.items.forEach(function(a){
      $(page.location).append(a.toHtml(page.templateId));
    });
  };

  view.populatePage = function () {
    portfolio.fetchAll(function() { view.buildIndexPage(portfolio); });
    recent.fetchGithub(function() { view.buildIndexPage(recent); });
    repos.requestRepos(repoView.index);
  };

  view.populatePage();

  module.view = view;

})(window);
