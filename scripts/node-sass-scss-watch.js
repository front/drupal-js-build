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

const changeOrAddedCss = require('./changeOrAddedCss');
const log = require('./log');

// Match only on .es6.js files.
const fileMatch = './**/[!_]*.scss';
// Ignore everything in node_modules
const watcher = chokidar.watch(fileMatch, {
  ignoreInitial: true,
  ignored: ['./node_modules/**']
});

const unlinkHandler = (err) => {
  if (err) {
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
    fs.stat(`${dir}/../${filename}.css`, () => {
      fs.unlink(`${dir}/../${filename}.css`, unlinkHandler);
    });
    fs.stat(`${dir}/../${filename}.css.map`, () => {
      fs.unlink(`${dir}/../${filename}.css.map`, unlinkHandler);
    });
  })
  .on('ready', () => log(`Watching '${fileMatch}' for changes.`));
