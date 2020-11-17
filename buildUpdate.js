const {argv}=require('yargs');

const fs = require('fs-extra')

try {
  console.log("Build update running");
  console.log(argv);
 
  const destDir = `build/exe/`;
  let filePaths = [];
  if (argv.configPath) {
    if (!Array.isArray(argv.configPath)) {
      filePaths.push(argv.configPath)
    } else {
      filePaths = argv.configPath;
    }

    filePaths.map(path => {
      // To copy a folder or file
      fs.copy(path, destDir+path, function (err) {
        if (err) {
          console.error("Error"+err);
        } else {
          console.log("success!");
        }
      });
    });
  }

} catch (e) {
  console.log(e)
}