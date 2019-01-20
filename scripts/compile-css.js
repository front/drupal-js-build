const chalk = require('chalk');
const log = require('./log');
const sass = require('node-sass');
const path = require('path');

module.exports = (filePath, callback) => {
  const filename = path.basename(filePath).slice(0, -5);
  const dir = path.dirname(filePath);

  sass.render({
    file: filePath,
    outputStyle: 'expanded', // leave minification to Drupal.
    outFile: `${dir}/../${filename}.css`,
    sourceMap: true, // or an absolute or relative (to outFile) path
  },(err, result) => {
    result.css = `/**\n * Don't edit this file. Find all style at ./sass folder.\n **/\n${
      result.css
    }`;

    if (err) {
      log(chalk.red(err));
      process.exitCode = 1;
    }
    else {
      callback(result);
    }
  });
};