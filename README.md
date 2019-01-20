# ⚒ Drupal JS Build

Command line to build JS files the way Drupal core does.

Just create your JS files as [name].es6.js. When this tool is executed, those files will be compiled by Babel to [name].js.

The script files were directly taken from Drupal core codebase without any modification so it will be easy to update them whenever necessary.

## Overview

Install it:

```
npm i drupal-js-build --save-dev
```

or globally:

```
npm i -g drupal-js-build
```

To build the files:

```
npx drupal-js-build
```

To watch the files:

```
npx drupal-js-build watch
```