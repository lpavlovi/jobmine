var cheerio = require('cheerio');

var extractTextFromElement = function(element) {
  var e = cheerio(element).text();
  return e != ' ' ? e : null;
}
var getJobID = function(elem) {
  var info = elem.children()[0].children[1].children[0];
  return extractTextFromElement(info);
};

var getJobTitle = function(elem) {
  var info = elem.children()[1].children[1].children[0].children[0];
  return extractTextFromElement(info);
};

var getCompany = function(elem) {
  var info = elem.children()[2].children[1].children[0];
  return extractTextFromElement(info);
};

var getUnit = function(elem) {
  var info = elem.children()[3].children[1].children[0];
  return extractTextFromElement(info);
};

var getTerm = function(elem) {
  var info = elem.children()[4].children[1].children[0];
  return extractTextFromElement(info);
};

var getAppStatus = function(elem) {
  var info = elem.children()[5].children[1].children[0];
  return extractTextFromElement(info);
};

var getUserStatus = function(elem) {
  var info = elem.children()[6].children[1].children[0];
  return extractTextFromElement(info);
};

var getDatePosted = function(elem) {
  var info = elem.children()[8].children[1].children[0];
  return extractTextFromElement(info);
};

var getNumberOfApplicants = function(elem) {
  var info = elem.children()[9].children[1].children[0];
  return extractTextFromElement(info);
};

var getAllJobDetails = function(e) {
  var row_details = {};
  row_details['job_id']           = getJobID(e);
  row_details['job_title']        = getJobTitle(e);
  row_details['company']          = getCompany(e);
  row_details['unit']             = getUnit(e);
  row_details['term']             = getTerm(e);
  row_details['app_status']       = getAppStatus(e);
  row_details['user_status']      = getUserStatus(e);
  row_details['date_posted']      = getDatePosted(e);
  row_details['total_applicants'] = getNumberOfApplicants(e);

  return row_details;
};

var scrapUntilNullID = function(elem) {
  var rows = []
  while(elem.attr('id') != null) {
    rows.push(getAllJobDetails(elem));
    elem = elem.next();
  }
  return rows;
};

var scrapeDOMFromStartingPoint = function(startingElementIdentifier) {
  var f = function(DOM) {
    var $ = cheerio.load(DOM);
    var startingElement = $(startingElementIdentifier);
    return scrapUntilNullID(startingElement);
  };
  return f
};

// Input: HTML document (from appliaction list request)
exports.getAllApps = scrapeDOMFromStartingPoint('tr[id="trUW_CO_APPS_VW2$0_row1"]');

// Input: HTML document (from appliaction list request)
exports.getActiveApps = scrapeDOMFromStartingPoint('tr[id="trUW_CO_STU_APPSV$0_row1"]');
