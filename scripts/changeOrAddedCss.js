const fs = require('fs');
const log = require('./log');
const compileCss = require('./compile-css');
const path = require('path');

module.exports = (filePath) => {
  log(`'${filePath}' is being processed.`);
  // Transform the file.
  compileCss(filePath, function (result) {
    const filename = path.basename(filePath).slice(0, -5);
    const dir = path.dirname(filePath);

    // Write the result to the filesystem.
    console.log(`${dir}/../${filename}.css`);

    fs.writeFile(`${dir}/../${filename}.css`, result.css, () => {
      // log(`${dir}/../${filename}.css`);
    });

    fs.writeFile(`${dir}/../${filename}.css.map`, result.map, () => {
      log(`'${filePath}' is finished.`);
    });
  });
}
