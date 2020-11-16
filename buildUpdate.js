const {argv}=require('yargs');

const fs = require('fs')

try {
console.log("Build update running");
console.log(argv);
 /*
yargs(hideBin(process.argv))
  .command('copy [configPath..]', 'copy files to config', (yargs) => {
    yargs
      .positional('configPath', {
        describe: 'path of files to copy',
        type: 'string'
      });
  }, (argv) => {
    console.info(argv);
        
    const srcDir = `index.js`;
    const destDir = `build/exe/`;

    argv.configPath.map(path => {
      
      // To copy a folder or file
      fs.copyFile(path, destDir+path, function (err) {
        if (err) {
          console.error("Error"+err);
        } else {
          console.log("success!");
        }
      });
    });

    
  })
  .argv
*/
    
  const srcDir = `index.js`;
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
      fs.copyFile(path, destDir+path, function (err) {
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