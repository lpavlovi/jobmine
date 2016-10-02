var extend = require('util')._extend;
var login_options = {
  'method': 'POST',
  'url': 'https://jobmine.ccol.uwaterloo.ca/psp/SS/?cmd=login&languageCd=ENG&sessionId=',
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': 'BIGipServerFANG_443.app~FANG_443_pool=rd2o00000000000000000000ffff816194aco80; jobmprod-80-PORTAL-PSJSESSIONID=ZY9ya8ZK5cjV6p1tWyTLK7hwfHRbKw4D!-1040026871;',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36'
  },
  'form': {
    'httpPort': '',
    'timezoneOffset': '240',
    'userid': '',
    'pwd': '',
    'submit': 'Submit'
  }
};
var app_options = {
  'method': 'GET',
  'url': 'https://jobmine.ccol.uwaterloo.ca/psc/ES/EMPLOYEE/WORK/c/UW_CO_STUDENTS.UW_CO_APP_SUMMARY.GBL?pslnkid=UW_CO_APP_SUMMARY_LINK&FolderPath=PORTAL_ROOT_OBJECT.UW_CO_APP_SUMMARY_LINK&IsFolder=false&IgnoreParamTempl=FolderPath%2cIsFolder&PortalActualURL=https%3a%2f%2fjobmine.ccol.uwaterloo.ca%2fpsc%2fES%2fEMPLOYEE%2fWORK%2fc%2fUW_CO_STUDENTS.UW_CO_APP_SUMMARY.GBL%3fpslnkid%3dUW_CO_APP_SUMMARY_LINK&PortalContentURL=https%3a%2f%2fjobmine.ccol.uwaterloo.ca%2fpsc%2fES%2fEMPLOYEE%2fWORK%2fc%2fUW_CO_STUDENTS.UW_CO_APP_SUMMARY.GBL%3fpslnkid%3dUW_CO_APP_SUMMARY_LINK&PortalContentProvider=WORK&PortalCRefLabel=Applications&PortalRegistryName=EMPLOYEE&PortalServletURI=https%3a%2f%2fjobmine.ccol.uwaterloo.ca%2fpsp%2fES%2f&PortalURI=https%3a%2f%2fjobmine.ccol.uwaterloo.ca%2fpsc%2fES%2f&PortalHostNode=WORK&NoCrumbs=yes&PortalKeyStruct=yes',
  'headers': {
    'Cookie': '',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36'
  }
};

// generates login options for request module - in: username and password
exports.login = function(username, password) {
  var return_val = extend(login_options, {});
  return_val['form']['userid'] = username;
  return_val['form']['pwd'] = password;
  return return_val;
};

// generates applications list options for request module - in: cookie string obtained from the login request
exports.applications = function(cookie_string) {
  var return_val = extend(app_options, {});
  return_val['headers']['Cookie'] = cookie_string;
  return return_val;
};
