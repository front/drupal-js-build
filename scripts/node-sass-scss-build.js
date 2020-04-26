const glob = require('glob');
const argv = require('minimist')(process.argv.slice(2));
const changeOrAddedCss = require('./changeOrAddedCss');

const drupalBuild = require('./drupalBuild');

// Match only on .scss files.
const fileMatch = drupalBuild.files.scssSrc;
// Ignore everything in node_modules
const globOptions = {
  ignore: ['./node_modules/**', ...drupalBuild.ignoreList],
};

const processFiles = (error, filePaths) => {
  if (error) {
    process.exitCode = 1;
  }
  // Process all the found files.
  let callback = changeOrAddedCss;
  filePaths.forEach(callback);
};

if (argv.file) {
  processFiles(null, [].concat(argv.file));
} else {
  glob(fileMatch, globOptions, processFiles);
}
process.exitCode = 0;
