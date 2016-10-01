var jm = require('./JobMine');

var userid;
var password;

if(process.argv.length == 4) {
  userid = process.argv[2];
  password = process.argv[3];
}

jm.login(userid, password)
  .then(jm.getAllApps)
  .then(
    function(apps){
      // create App List
      var l = jm.buildAppList(apps);

      // output interviews -- it might be an empty array
      l.interviews().to_console();
    }
  );

