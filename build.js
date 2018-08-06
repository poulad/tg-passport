const $ = require('shelljs');

$.config.fatal = true;
const rootDir = __dirname;

console.log('# Removing dist/ directory');
$.rm('-rf', `${rootDir}/dist/*`);

console.log('# Building Express app');
$.exec('npm run "build:prod"');

console.log('# Copying static files');
$.cp('-r', `${rootDir}/src/public`, `${rootDir}/dist/public`);

console.log('# Build Successful');
