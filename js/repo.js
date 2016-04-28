(function(module) {
  var repos = {};

  repos.all = []; // will hold all incoming data from github api

  repos.requestRepos = function(callback) {
    $.ajax({ // sends request for information via github API — github token is set as a heading in Heroku so it knows what account to look at.
      url: '/github/user/repos' +
            '?per_page=50' +
            '&sort=updated',
      type: 'GET',
      headers : {
        "Authorization" : 'token ' + GITHUB_TOKEN
      },
      success: function (data, message, xhr) { // when info is successfully received, push to repos.all
        repos.all = data;
      }
    }).done(callback);
  };

  repos.owned = function() { // filters the incoming content and only shows repos that are NOT forks, and that have a description that belong to me
    return repos.all.filter(function(repo) {
      if (!repo.fork && repo.description) {
        return repo.owner.login == 'katesowles';
      };

    });
  };

  module.repos = repos;
})(window);
