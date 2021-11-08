const fs = require('fs');
const path = require('path');

const log = require('./log');
const compile = require('./compile');
const drupalBuild = require('./drupalBuild');

module.exports = (filePath) => {
  log(`'${filePath}' is being processed.`);
  // Transform the file.
  compile(filePath, function write(code) {
    const fileName = path.basename(filePath).slice(0, -7);
    const dir = path.dirname(filePath);

    const destinationJs = path.resolve(dir, drupalBuild.files.jsDestination, `${fileName}.js`);

    // Write the result to the filesystem.
    fs.writeFile(destinationJs, code, (err) => {
      if (err) {
        log(`Failed to write '${destinationJs}': ${err}`);
        return;
      }

      log(`'${filePath}' is finished.`);
    });
  });
};
