(function(module) {

  var repos = {};

  repos.all = [];

  repos.requestRepos = function (callback) {
    var url = 'https://api.github.com/user/repos';
    var authString = 'token' + githubToken;
    var jqXHR = $.ajax({
      url : url,
      type : 'GET',
      dataType : 'JSON',
      headers : {
        "Authorization" : authString
      },
    }).done( function(data) {
      data.map( function(obj) {
        repos.all.push(obj);
      });
    }).error( function() {
      console.log('An error occurred while fetching data from ' + url + '. Try again later.');
    });
    if (callback) {
      callback();
    }
  };

  repos.with = function (attr) {
    return repos.all.filter (function (repo) {
      return repo[attr];
    });
  };

  repos.mine = function (owner) {
    return repos.all.filter(function(repo) {
      return repo.owner.login === owner;
    });
  };

  module.repos = repos;

})(window);
