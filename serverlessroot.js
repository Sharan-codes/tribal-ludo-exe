var exec = require('child_process').exec,
    child;

try {
console.log("Serverless Running")
child = exec('npm run offline',
  function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
})

child.stdout.on('data', function(data) {
  console.log(data.toString()); 
});
child.stderr.on('data', function(data) {
  console.log(data.toString()); 
});
} catch (e) {
  console.log(e)
}