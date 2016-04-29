(function(module) {
  var repos = {};

  repos.all = []; // will hold all incoming data from github api

  repos.requestRepos = function(callback) {
    $.ajax({ // sends request for information via github API — github token is set as a heading in Heroku so it knows what account to look at.
      url: '/github/user/repos' +
            '?per_page=50' +
            '&sort=updated',
      type: 'GET',
      success: function (data, message, xhr) { // when info is successfully received, push to repos.all
        repos.all = data;
        callback();
      }
    });
  };

  repos.owned = function() { // filters the incoming content and only shows repos that are NOT forks, and that have a description that belong to me

    var x = repos.all.filter(function(repo) {
      if (!repo.fork && repo.description) {
        return repo.owner.login == 'katesowles';
      };
    });
    return x;
  };

  module.repos = repos;
})(window);
