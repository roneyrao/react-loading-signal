const fs = require('fs');

const pfx = 'file:///' + fs.workingDirectory + '/e2e/index.html?dir=' + casper.cli.options.dir + '&entry=';

casper.options.onError = function(err) {
  casper.echo('environment error' + err);
}

casper.options.remoteScripts = ['../node_modules/babel-polyfill/dist/polyfill.js'];

casper.test.begin('custom theme', function (test) {
  casper.start(pfx + 'theme')
    .then(function () {
      return this.waitForSelector('.LoadingSignal__spinning');
    })
    .then(function () {
      this.thenClick('#load');
      return this.waitForText('--');
    })
    .then(function () {
      return this.waitForText('\\');
    })
    .then(function () {
      return this.waitForText('|');
    })
    .then(function () {
      return this.waitForText('/');
    })
    .then(function () {
      this.thenClick('#stop');
      this.waitWhileVisible('span');
      test.pass();
    })
  casper.run(function () {
    test.done();
  });
});

