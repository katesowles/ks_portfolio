// function makeSizer(size, mult) {
//
//   return function(mult) {
//     document.body.style.fontSize = (mult * size) + 'px';
//   };
// }
//
// var size12 = makeSizer(12);
// var size14 = makeSizer(14);
// var size16 = makeSizer(16);

///////////////////////////////////////////////////////////////////////////////

// var add = (function() {
//   var counter = 0;
//   return function() {
//     return counter += 1;
//   };
// })();
//
// add();
// add();
// add();

///////////////////////////////////////////////////////////////////////////////

// Page
// embedId
// DatasetKey
// Filename

function Page (DatasetKey, Filename, location) {
  this.DatasetKey = DatasetKey;
  this.Filename = Filename;
  this.location = location;
  this.items = [];
  this.loadAndSort = function(data, page) {
    console.log('filename in loadAndSort: ', this.Filename);
    data.sort(function(a,b) {
      return (new Date(b.pubDate)) - (new Date(a.pubDate));
    });
    data.forEach(function(item) {
      page.items.push(new Item(item));
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

Page.prototype.toHtml = function() {
  var source = $('#' + this.location).html();
  var template = Handlebars.compile(source);
  return template(this);
};

Page.prototype.fetchAll = function(callback, page) {
  // console.log('filename in fetchAll: ', this.Filename);
  // var loadAndSort = function(data, page) {
  //   console.log('filename in loadAndSort: ', this.Filename);
  //   data.sort(function(a,b) {
  //     return (new Date(b.pubDate)) - (new Date(a.pubDate));
  //   });
  //   data.forEach(function(item) {
  //     page.items.push(new Item(item));
  //   });
  // };

  if (localStorage[this.DatasetKey]) {
    this.loadAndSort(JSON.parse(localStorage[this.DatasetKey]));
    callback;
  }
  else {
    var newData = $.getJSON('data/' + this.Filename + '.json');
    newData.done(function(data) {
      this.loadAndSort(data);
      localStorage[this.DatasetKey] = JSON.stringify(data);
      callback;
    });
  }
};
