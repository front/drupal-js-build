/**
 * @file
 *
 * Watch changes to *.scss files and compile them to CSS during development.
 *
 * @internal This file is part of the core css build process and is only
 * meant to be used in that context.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const changeOrAddedCss = require('./changeOrAddedCss');
const log = require('./log');
const drupalBuild = require('./drupalBuild');

// Match only on .scss files.
const fileMatch = drupalBuild.files.scssSrc;
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
  .on('add', changeOrAddedCss)
  .on('change', changeOrAddedCss)
  .on('unlink', (filePath) => {
    const filename = path.basename(filePath).slice(0, -5);
    const dir = path.dirname(filePath);

    const destinationCss = path.resolve(dir, drupalBuild.files.scssDestination, `${filename}.css`);

    fs.unlink(destinationCss, unlinkHandler);
    fs.unlink(`${destinationCss}.map`, unlinkHandler);
  })
  .on('ready', () => log(`Watching '${fileMatch}' for changes.`));
