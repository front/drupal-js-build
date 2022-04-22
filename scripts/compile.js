const path = require('path');
const chalk = require('chalk');
const log = require('./log');
const drupalBuild = require('./drupalBuild');
const babel = require('@babel/core');
require("@babel/register");

module.exports = (filePath, callback) => {
  // Transform the file.
  // Check process.env.NODE_ENV to see if we should create sourcemaps.
  const plugins = [];
  if (drupalBuild.jsHeader) {
    plugins.push(
      [
        'add-header-comment', {
          'header': [
            drupalBuild.jsHeader,
          ],
        },
      ]
    );
  }

  babel.transformFile(
    filePath,
    {
      cwd: path.resolve(__dirname, '../'),
      sourceMaps: process.env.NODE_ENV === 'development' ? 'inline' : false,
      comments: false,
      plugins: plugins,
    },
    (err, result) => {
      if (err) {
        log(chalk.red(err));
        process.exitCode = 1;
      }
      else {
        callback(result.code);
      }
    }
  );
};
