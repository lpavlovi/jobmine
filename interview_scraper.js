var cheerio = require('cheerio');

function extractTextFromElement(element) {
  var e = cheerio(element).text();
  return e != ' ' ? e : null;
}
var getJobID = function(parentElem) {
  return extractTextFromElement( parentElem.children()[1].children[1].children[0] );
};


var getJobTitle = function(parentElem) {
  return extractTextFromElement( parentElem.children()[3].children[1].children[0].children[0] );
};

var getJobStatus = function(parentElem) {
  return extractTextFromElement( parentElem.children()[3].children[1].children[0].children[0] );
};

var getCompany = function(parentElem) {
  return extractTextFromElement( parentElem.children()[2].children[1].children[0] );
};

var getInterviewDate = function(parentElem) {
  return extractTextFromElement( parentElem.children()[4].children[1].children[0] );
};

var getInterviewType = function(parentElem) {
  return extractTextFromElement( parentElem.children()[5].children[1].children[0] );
};

var getInterviewStartTime = function(parentElem) {
  return extractTextFromElement( parentElem.children()[7].children[1].children[0] );
};

var getInterviewLenght = function(parentElem) {
  return extractTextFromElement( parentElem.children()[8].children[1].children[0] );
};

var getInterviewLocation = function(parentElem) {
  return extractTextFromElement( parentElem.children()[9].children[1].children[0] );
};

var getInterviewInstructions = function(parentElem) {
  return extractTextFromElement( parentElem.children()[10].children[1].children[0] );
};

var getInterviewer = function(parentElem) {
  return extractTextFromElement( parentElem.children()[11].children[1].children[0] );
};

var getAllInterviewDetails = function(e) {
  var row_details = {};
  row_details['job_id']                 = getJobID(e);
  row_details['job_title']              = getJobTitle(e);
  row_details['company']                = getCompany(e);
  row_details['job_status']             = getJobStatus(e);
  row_details['interview_date']         = getInterviewDate(e);
  row_details['interview_type']         = getInterviewType(e);
  row_details['interview_start_time']   = getInterviewStartTime(e);
  row_details['interview_length']       = getInterviewLenght(e);
  row_details['interview_instructions'] = getInterviewInstructions(e);
  row_details['interview_location']     = getInterviewLocation(e);
  row_details['interviewer']            = getInterviewer(e);

  return row_details;
};

var scrapUntilNullID = function(elem) {
  var rows = []
  while(elem.attr('id') != null) {
    rows.push(getAllInterviewDetails(elem));
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

exports.getAllInterviews = scrapeDOMFromStartingPoint('tr[id="trUW_CO_STUD_INTV$0_row1"]');

