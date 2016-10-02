var Q = require('q');
var request = require('request');
var cookies = require('./cookies');
var applicationScraper = require('./application_scraper');
var interviewScraper = require('./interview_scraper');
var requestOptionBuilder = require('./jobmine_request_options');
var jobmineConfig = require('./jobmine_config');
var Apps = require('./applications');

var verifyResponseHeaders = function(headers) {
  return headers != null &&
  headers['location'] == jobmineConfig.LOGIN_SUCCESS_LOCATION &&
  headers['set-cookie'] != null
};

exports.login = function(user, pass) {
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

exports.getAllApps = function(cookie) {
  var deferred = Q.defer();
  var appOptions = requestOptionBuilder.applications(cookie);
  request(appOptions, function (error, response, body) {
    if(error != null) {
      deferred.reject(error);
    }
    var allApps = applicationScraper.getAllApps(body);
    deferred.resolve( Apps(allApps) );
  });

  return deferred.promise;
};

exports.getAllInterviews = function(cookie) {
  var deferred = Q.defer();
  var interviewOptions = requestOptionBuilder.interviews(cookie);
  request(interviewOptions, function (error, response, body) {
    if(error != null) {
      deferred.reject(error);
    }
    var allInterviews = interviewScraper.getAllInterviews(body);
    deferred.resolve( allInterviews );
  });

  return deferred.promise;
};


