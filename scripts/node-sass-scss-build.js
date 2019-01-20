const glob = require('glob');
const argv = require('minimist')(process.argv.slice(2));
const changeOrAddedCss = require('./changeOrAddedCss');
const compileCss = require('./compile-css');
const log = require('./log');

// Match only on .scss files.
const fileMatch = './**/[!_]*.scss';
// Ignore everything in node_modules
const globOptions = {
  ignore: ['./node_modules/**'],
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
