const fs = require('fs-extra');
const Promise = require('bluebird');
const path = require('path');
let webpack = require('webpack');
let install = require('npm-install-package');

const rootPath = process.cwd();

webpack = Promise.promisify(webpack);
install = Promise.promisify(install);

const getConfig = require('./webpack-config-creator');
const publishedPath = path.join(__dirname, 'published');
fs.stat(publishedPath)
  .then(function () {},
    function () {
      return fs.mkdir(publishedPath);
    })
  .then(function () {
    process.chdir(publishedPath);
    fs.writeFileSync('package.json', '{}');

    return install([rootPath]);
  })

  .then(function () {
    console.log('published is installed');
    process.chdir(__dirname);
  })
  .then(function () {
    return webpack(getConfig('from_es'));
  })
  .then(function () {
    console.log('es is built');
    return webpack(getConfig('from_cjs'));
  })
  .then(function () {
    console.log('cjs is built');
    return webpack(getConfig('from_bundle'));
  })
  .then(function () {
    console.log('bundle is built');
    console.log('succeed to build e2e from published')
    // process.chdir(rootPath);
  }, function (err) {
    console.log(err);
    process.exit(1);
  });
