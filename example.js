var JobMine = require('./JobMine');
var userid;
var password;

// Command line example
if(process.argv.length == 4) {
  userid = process.argv[2];
  password = process.argv[3];
}

// getAllApps resolves to give an Apps object (includes some filtering functions)
JobMine.login(userid, password)
  .then(JobMine.getAllApps)
  .then((apps) => {

    // show all apps as a JSON string
    console.log('All Apps (JSON):');
    console.log( apps.to_json() );

    // show all interviews - format: "COMPANY - JOB_TITLE"
    console.log('Interviews:');
    console.log( apps.interviews().company_and_position() );

    // show all rejections - format: "COMPANY - JOB_TITLE"
    console.log('Rejections:');
    console.log( apps.rejections().company_and_position() );

  });

// getAllInterviews resolves to give an array with interview details
// the Apps object equivalent for interviews will come later
JobMine.login(userid, password)
  .then(JobMine.getAllInterviews)
  .then((interviews) => {
    // Array of interviews
    console.log( interviews );

    // JSON of the interview array
    console.log( JSON.parse(interviews) );
  });
