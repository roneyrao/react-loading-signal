const fs = require('fs-extra');
const Promise = require('bluebird');
const path = require('path');
const webpack = require('webpack');
const npm = require('npm');

const rootPath = process.cwd();
const rootModule = path.join(rootPath, 'node_modules');

const webpack = Promise.promisify(webpack);
const loadNpm = Promise.promisify(npm.load);
const npmInstall = Promise.promisify(npm.commands.install);

npm.on('log', function(message) {
  console.log(message);
});

const tempPath = path.join(__dirname, 'temp');
if (!fs.mkdirSync(tempPath)) {
  throw new Error('fail to write temp folder');
}
process.chdir(tempPath);
if (!fs.writeFileSync('package.json', '{}')) {
  throw new Error('fail to write package.json');
}

loadNpm
  .then(function () {
    return npmInstall([rootPath]);
  })
  .then(function () {
    return fs.move('node_modules/react-loading-signal', rootModule);
  })
  .then(function () {
    process.chdir(__dirname);
    return fs.remove(tempPath);
  })
  .then(function () {
    process.env.NODE_ENV = 'cjs';
    process.env.BABEL_ENV = process.env.NODE_ENV;
    return webpack(require('./webpack.config'));
  })
  .then(function () {
    process.env.NODE_ENV = 'bundle';
    return webpack(require('./webpack.config'));
  })
  .then(function () {
    process.env.NODE_ENV = 'es';
    process.env.BABEL_ENV = process.env.NODE_ENV;
    return webpack(require('./webpack.config'));
  });
