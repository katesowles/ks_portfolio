(function(module) {

  function Generate (ObjectName, TemplateContainerId, DatasetKey, FilePath) {
    ObjectName.all = [];

    ObjectName.prototype.toHtml = function() {
      var source = $(templateContainerId);
      var template = Handlebars.compile(source);

      this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);

      this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

      return template(this);
    };

    ObjectName.loadAndSort = function(DatasetKey) {
      DatasetKey.sort(function(a,b) {
        return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
      });

      ObjectName.all = DatasetKey.map(function(item) {
        return new ObjectName(item);
      });
    };

    ObjectName.fetchAll = function(DatasetKey) {
      if (localStorage.DatasetKey) {
        ObjectName.loadAndSort(JSON.parse(localStorage.DatasetKey));
        populate.buildIndexPage();
      }
      else {
        var newData = $.getJSON(FilePath);
        newData.done(function(data) {
          ObjectName.loadAndSort(data);
          localStorage.DatasetKey = JSON.stringify(data);
          populate.buildIndexPage();
        });
      }
    };
  }

  module.Generate = Generate;

})(window);
