# jobmine
Gets user's applications from JobMine as JSON.

### Install
```
npm install jobmine
```

### Example Usage
#### Applications
```javascript
var JobMine = require('jobmine');

// getAllApps resolves to give an Apps object (includes some filtering functions)
JobMine.login(USERID, PASSWORD)
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
```
#### Interviews
```javascript
var JobMine = require('jobmine');

// getAllInterviews resolves to give an array with interview details
// the Apps object equivalent for interviews will come later
JobMine.login(USERID, PASSWORD)
  .then(JobMine.getAllInterviews)
  .then((interviews) => {
    // Array of interviews
    console.log( interviews );

    // JSON of the interview array
    console.log( JSON.parse(interviews) );
  });
```
