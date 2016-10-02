var jm = require('./JobMine');
var userid;
var password;

// Command line example
if(process.argv.length == 4) {
  userid = process.argv[2];
  password = process.argv[3];
}

jm.login(userid, password)
  .then(jm.getAllApps)
  .then((apps) => {
    // create App List
    var l = jm.buildAppList(apps);

    // output interviews -- it might be an empty array
    console.log( l.interviews().full() );

    // all rejections - format: "{{COMPANY}} - {{JOB_TITLE}}"
    console.log( l.rejections().company_and_position() );
  });

