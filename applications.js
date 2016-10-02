var _ = require('underscore');

// Apps object has a few methods for filtering and displaying
function Apps(app_list) {
  this.list = app_list;
}

Apps.prototype.to_json = function() {
  return JSON.stringify(this.list);
};

Apps.prototype.full = function() {
  return this.list;
};

Apps.prototype.company_and_position = function() {
  var a = this.list;
  var companies = _.map(a, function(app) {
    return (app['company'] + ' - ' + app['job_title']);
  });

  return companies;
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
