const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const fs = require('fs-extra')

try {
console.log("Build update running");
 
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
      fs.copy(path, destDir+path, function (err) {
        if (err) {
          console.error("Error"+err);
        } else {
          console.log("success!");
        }
      });
    });

    
  })
  .argv

} catch (e) {
  console.log(e)
}