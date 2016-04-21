// function makeSizer(size) {
//
//   return function() {
//     document.body.style.fontSize = size + 'px';
//   };
// }
//
// var size12 = makeSizer(12);
// var size14 = makeSizer(14);
// var size16 = makeSizer(16);

///////////////////////////////////////////////////////////////////////////////

function createObject(objectName) {

  return objectName = function (opts) {
    this.title = opts.title;
    this.category = opts.category;
    this.taglink = opts.taglink;
    this.imageSrc = opts.imageSrc;
    this.pubDate = opts.pubDate;
    this.caption = opts.caption;
  };
}

var one = createObject(one);
var two = createObject(two);

function toHtml(objectName, source) {
  return objectName.prototype.toHtml = function() {
    var template = Handlebars.compile(source);

    this.daysAgo = parseInt((new Date() - new Date(this.pubDate))/60/60/24/1000);

    this.publishStatus = this.pubDate ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

    return template(this);
  };
}

var three = toHtml(one, $('#oneTemplate'));
var four = toHtml(two, $('#twoTemplate'));


  // objectName.prototype.toHtml = function() {
  //   var source = $(templateContainerId);
  //   var template = Handlebars.compile(source);
  //
  //   this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  //
  //   this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  //
  //   return template(this);
  // };
  //
  // objectName.all = [];
  //
  // objectName.loadAndSort = function(DatasetKey) {
  //   DatasetKey.sort(function(a,b) {
  //     return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  //   });
  //
  //   objectName.all = DatasetKey.map(function(item) {
  //     return new objectName(item);
  //   });
  // };
  //
  // objectName.fetchAll = function(DatasetKey) {
  //   if (localStorage.DatasetKey) {
  //     objectName.loadAndSort(JSON.parse(localStorage.DatasetKey));
  //     populate.buildIndexPage();
  //   }
  //   else {
  //     var newData = $.getJSON(FilePath);
  //     newData.done(function(data) {
  //       objectName.loadAndSort(data);
  //       localStorage.DatasetKey = JSON.stringify(data);
  //       populate.buildIndexPage();
  //     });
  //   }
  // };

// var portfolio = generate( portfolio, '#portfolioTemplate', 'portfolioData', 'data/portfolio.json' );
// var recent = generate( recent, '#recentTemplate', 'recentData', 'data/recent.json' );
