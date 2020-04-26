const chalk = require('chalk');
const sass = require('node-sass');
const path = require('path');

const log = require('./log');
const drupalBuild = require('./drupalBuild');

module.exports = (filePath, callback) => {
  const filename = path.basename(filePath).slice(0, -5);
  const dir = path.dirname(filePath);
  const destinationCss = path.resolve(dir, drupalBuild.files.scssDestination, `${filename}.css`);

  sass.render({
    outputStyle: 'expanded', // leave minification to Drupal.
    sourceMap: true, // or an absolute or relative (to outFile) path
    ...drupalBuild.sassSettings,
    file: filePath,
    outFile: destinationCss,
  },(err, result) => {
    if (drupalBuild.cssHeader) {
      result.css = drupalBuild.cssHeader + result.css;
    }

    if (err) {
      log(chalk.red(err));
      process.exitCode = 1;
    }
    else {
      callback(result);
    }
  });
};
