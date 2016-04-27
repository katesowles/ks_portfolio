(function(module) {
  var repos = {};

  repos.all = [];

  repos.requestRepos = function(callback) {
    $.ajax({
      url: '/github/user/repos' +
            '?per_page=50' +
            '&sort=updated',
      type: 'GET',
      success: function (data, message, xhr) {
        repos.all = data;
      }
    }).done(callback);

    // var url = '/github/user/repos' +
    // var authString = 'token '+ githubToken;
    // var jqXHR = $.ajax({
    //   url : url,
    //   type : 'GET',
    //   dataType : 'JSON',
    //   headers : {
    //     "Authorization" : authString
    //   },
    // }).done( function (data) {
    //   data.map( function(obj) {
    //     repos.all.push(obj);
    //   });
    // }).error(function () {
    // });
    // if (callback) {
    //   callback();
    // }
  };

  repos.owned = function() {
    return repos.all.filter(function(repo) {
      if (!repo.fork && repo.description) {
        return repo.owner.login == 'katesowles';
      };

    });
  };

  module.repos = repos;
})(window);
