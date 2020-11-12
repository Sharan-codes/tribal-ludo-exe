 const global = require('../../global');
const restBase = require('../../base/restBase.class');
const utility = require("../../library/utilityLib/utility");
const mgUserLib = require('../../library/databaseLib/user.lib.js');
const mgGameDataLib = require('../../library/databaseLib/gameData.lib.js');
const mgEventActivityLib = require('../../library/databaseLib/eventActivity.lib');
var exec = require('child_process').exec,child;

class testAction extends restBase {


  async executeMethod() {
    try {

      const { } = this;

      console.log("test GET API called")

      child = exec('node src/library/utilityLib/runScript.js',
        function (error, stdout, stderr) {
          console.log('stdout: ' + stdout);
          console.log('stderr: ' + stderr);
          if (error !== null) {
            console.log('exec error: ' + error);
          }
      })
      /*
      child.stdout.on('data', function(data) {
        console.log(data.toString()); 
      });
      child.stderr.on('data', function(data) {
        console.log(data.toString()); 
      });*/
      
      this.setResponse("SUCCESS");
      return {
        
      };
    } catch (e) {
      console.log(e);
    }
  };
}
module.exports = testAction;
