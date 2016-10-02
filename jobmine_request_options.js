var extend = require('util')._extend;
var config = require('./jobmine_config');

var loginOptions = {
  'method': 'POST',
  'url': config.loginURL,
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': config.loginDefaultCookie,
    'User-Agent': config.userAgentDefault 
  },
  'form': {
    'httpPort': '',
    'timezoneOffset': '240',
    'userid': '',
    'pwd': '',
    'submit': 'Submit'
  }
};
var basicOptions = {
  'method': 'GET',
  'url': '',
  'headers': {
    'Cookie': '',
    'User-Agent': config.userAgentDefault
  }
};

var optionGenerationTemplate = function(url) {
  var g = function(cookie_string) {
    var return_val = extend(basicOptions, {});
    return_val['url']= url;
    return_val['headers']['Cookie'] = cookie_string;
    return return_val;
  };
  return g;
};

// generates login options for request module - in: username and password
exports.login = function(username, password) {
  var return_val = extend(loginOptions, {});
  return_val['form']['userid'] = username;
  return_val['form']['pwd'] = password;
  return return_val;
};

// generates applications list options for request module - in: cookie string from the login request
exports.applications = optionGenerationTemplate(config.applicationListURL);

// generates interview list options for request module - in: cookie string from the login request
exports.interviews = optionGenerationTemplate(config.interviewListURL);
