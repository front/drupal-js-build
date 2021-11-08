/**
 * @file
 *
 * Watch changes to *.es6.js files and compile them to ES5 during development.
 *
 * @internal This file is part of the core javascript build process and is only
 * meant to be used in that context.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const changeOrAdded = require('./changeOrAdded');
const log = require('./log');

const drupalBuild = require('./drupalBuild');

// Match only on .es6.js files.
const fileMatch = drupalBuild.files.jsSrc;
// Ignore everything in node_modules
const watcher = chokidar.watch(fileMatch, {
  ignoreInitial: true,
  ignored: ['./node_modules/**', ...drupalBuild.ignoreList],
  ...drupalBuild.watchSettings,
});

const unlinkHandler = (err) => {
  if (err && err.code !== 'ENOENT') {
    // Ignore logging if the file already doesn't exist on disk.
    log(err);
  }
};

// Watch for filesystem changes.
watcher
  .on('add', changeOrAdded)
  .on('change', changeOrAdded)
  .on('unlink', (filePath) => {
    const fileName = path.basename(filePath).slice(0, -7);
    const dir = path.dirname(filePath);

    const destinationJs = path.resolve(dir, drupalBuild.files.jsDestination, `${fileName}.js`);

    fs.unlink(destinationJs, unlinkHandler);
  })
  .on('ready', () => log(`Watching '${fileMatch}' for changes.`));
