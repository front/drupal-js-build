# ⚒ Drupal JS Build

Command line to build JS files the way Drupal core does.

Just create your JS files as [name].es6.js. When this tool is executed, those files will be compiled by Babel to [name].js.

The script files were directly taken from Drupal core codebase and updated to 
support custom build configurations using the `.drupalbuild.js` file. 
The default configuration will match Drupal's default behaviour/convention.

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

### Bonus
This tool can also compile SASS files using `node-sass`. 

The recommended folder structure is `./css/sass/[file].scss`. The files will be compiled to parent folder as `./css/[file].css`

To compile js and scss files:

```
npx drupal-js-build --css
```

or

```
npx drupal-js-build watch --css
```

To compile scss files only:

```
npx drupal-js-build --only-css
```

or

```
npx drupal-js-build watch --only-css
```

### Configuration.

You may configure how the script runs by creating a local `.drupalbuild.js` file
in the working directory running the script.

An example configuration is available below:
 
 ```javascript
module.exports = {
  ignoreList: [
    // Don't include the local .ignore-me folder.
    './.ignore-me/**'
  ],
  watchSettings: {
      // Additional settings to pass along to chokidar.watch
      usePolling: true, // Use polling in non-standard environments.
  },
  sassSettings: {
    // Additional settings to pass along to the node-sass.render.
    sourceMap: false, // Disable CSS sourcemaps.
  },
  jsHeader: `Custom JS header comment`, // May be set to null to remove the header.
  cssHeader: `/**\n * Custom CSS header comment.\n **/\n`, // May be set to null to remove the header.
  files: {
    // Note: All matched files must end in '.es6.js'
    jsSrc: './**/*.es6.js',
    jsDestination: './', // Relative to the currently processed es6.js file.
    // Note: All matched files must end in '.scss'
    scssSrc: './css/**/[!_]*.scss', 
    scssDestination: '../',  // Relative to the currently processed scss file.
  },
};
```
