const fs = require('fs');
const path = require('path');

const log = require('./log');
const compileCss = require('./compile-css');
const drupalBuild = require('./drupalBuild');

module.exports = (filePath) => {
  log(`'${filePath}' is being processed.`);
  // Transform the file.
  compileCss(filePath, function (result) {
    const filename = path.basename(filePath).slice(0, -5);
    const dir = path.dirname(filePath);

    const destinationCss = path.resolve(dir, drupalBuild.files.scssDestination, `${filename}.css`);

    // Write the result to the filesystem.
    log(`Processing '${destinationCss}'`);

    fs.writeFile(destinationCss, result.css, (err) => {
      if (err) {
        log(`Failed to write '${destinationCss}': ${err}`);
        return;
      }

      if (result.map) {
        // Write the map file if it's enabled.
        fs.writeFile(`${destinationCss}.map`, result.map, () => {
          if (err) {
            log(`Failed to write '${destinationCss}.map': ${err}`);
            return;
          }

          log(`'${filePath}' is finished.`);
        });
      } else {
        // Attempt to delete any existing sourcemap.
        // We don't care if it fails or not.
        fs.unlink(`${destinationCss}.map`);

        log(`'${filePath}' is finished.`);
      }
    });
  });
};
