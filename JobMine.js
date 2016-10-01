var Q = require('q');
var request = require('request');
var cookies = require('./cookies');
var applicationScraper = require('./application_scraper');
var requestOptionBuilder = require('./jobmine_request_options');
var jobmineConfig = require('./jobmine_config');
var Apps = require('./applications');

var login = function(user, pass) {
  if (user == undefined || pass == undefined) new Error();

  var deferred = Q.defer();
  var loginOpts = requestOptionBuilder.login(user, pass);

  request(loginOpts, function (error, response, body) {
    if (verifyResponseHeaders(response.headers)) {
      var cookie_string = cookies.generate(response.headers['set-cookie']);
      deferred.resolve(cookie_string);
    }
    else {
      deferred.reject();
    }
  });

  return deferred.promise;
};

var getAllApps = function(cookie) {
  var deferred = Q.defer();
  var appOptions = requestOptionBuilder.applications(cookie);
  request(appOptions, function (error, response, body) {
    if(error != null) {
      deferred.reject(error);
    }
    var allApps = applicationScraper.getAllApps(body);
    deferred.resolve(allApps);
  });

  return deferred.promise;
};

var buildAppList = function(all_apps) {
  return Apps(all_apps);
};

var verifyResponseHeaders = function(headers) {
  return headers != null &&
  headers['location'] == jobmineConfig.LOGIN_SUCCESS_LOCATION &&
  headers['set-cookie'] != null
};

module.exports = {
  'login': login,
  'getAllApps': getAllApps,
  'buildAppList': buildAppList,
  'show_all_interviews_from_login': function(u, p) {
    login(u,p)
      .then(getAllApps)
      .then(function(all_apps) {
        var myApps = Apps(all_apps); 
        myApps
          .interviews()
          .to_console();
      });
  }
};
