const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const log = require('./log');
const drupalBuild = require('./drupalBuild');
const compile = require('./compile');

module.exports = (filePath) => {
  log(`'${filePath}' is being checked.`);
  // Transform the file.
  compile(filePath, function check(code) {
    const fileName = path.basename(filePath).slice(0, -7);
    const dir = path.dirname(filePath);

    const destinationJs = path.resolve(dir, drupalBuild.files.jsDestination, `${fileName}.js`);

    fs.readFile(destinationJs, function read(err, data) {
      if (err) {
        log(chalk.red(err));
        process.exitCode = 1;
        return;
      }
      if (code !== data.toString()) {
        log(chalk.red(`'${filePath}' is not updated.`));
        process.exitCode = 1;
      }
    });
  });
};
