function Page (DatasetKey, Filename, location, templateId) {
  this.DatasetKey = DatasetKey;
  this.Filename = Filename;
  this.location = location;
  this.templateId = templateId;
  this.items = [];

  var that = this;

  this.loadAndSort = function(data) {
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
    callback(arguments[1]);
  }
  else {
    var that = this;
    var newData = $.getJSON('data/' + this.Filename + '.json');
    newData.done(function(data) {
      that.loadAndSort(data);
      localStorage[this.DatasetKey] = JSON.stringify(data);
      callback(arguments[1]);
    });
  }
};

Item.prototype.toHtml = function(templateId) {
  var source = $('#' + templateId).html();
  var template = Handlebars.compile(source);
  return template(this);
};
