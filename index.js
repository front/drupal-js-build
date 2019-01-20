#!/usr/bin/env node
'use strict';
const chalk = require('chalk');
const argv = require('minimist')(process.argv.slice(2));
const command = argv._[0] || ['build'];

console.log(`${chalk.red('⚒ Drupal JS Build')} [${chalk.blue(command)}]`);

switch (command) {
  case 'watch':
    require('./scripts/babel-es6-watch');
    break;
  case 'build':
  default:
    require('./scripts/babel-es6-build');
    break;
}
