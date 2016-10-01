var _ = require('underscore');

function Apps(app_list) {
  this.list = app_list;
}

Apps.prototype.to_console = function() {
  var a = this.list;
  console.log(a);
};

Apps.prototype.to_json = function() {
  return JSON.stringify(this.list);
};

Apps.prototype.show_company_and_position = function() {
  var a = this.list;
  var companies = _.map(a, function(app) {
    return (app['company'] + ' - ' + app['job_title']);
  });
  console.log(companies);
};

Apps.prototype.show_company = function() {
  var a = this.list;
  var companies = _.pluck(a, 'company');
  console.log(companies);
};

Apps.prototype.interviews = function() {
  var a = this.list;
  var i = _.filter(a, function(app) {
    return app['user_status'] == 'Selected' || app['user_status'] == 'Scheduled';
  });

  return new Apps(i);
};

Apps.prototype.rejections = function() {
  var a = this.list;
  var i = _.filter(a, function(app) {
    return app['user_status'] == 'Not Selected';
  });
  return new Apps(i);
};

module.exports = function(apps) {
  return new Apps(apps);
};
