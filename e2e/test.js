require('babel-polyfill');

const fs = require('fs');
const resemble = require('resemblejs');
const matchSnapshots = require('./snapshots-matcher');

const pfx = 'file:///' + fs.workingDirectory + '/e2e/index.html?dir=' + casper.cli.options.dir + '&entry=';
const snapshotDir = fs.workingDirectory + '/e2e/snapshots/';

casper.options.remoteScripts = ['../node_modules/babel-polyfill/dist/polyfill.js'];

casper.options.onError = function(err) {
  casper.echo('environment error' + err);
}


function testSnapshots(test, file) {
  const result = matchSnapshots(file);
  casper.waitFor(result.wait).then(function () {
    if (result.error) {
      test.fail(result.error);
    } else {
      test.assertEqual(result.match, true);
    }
  });
}
casper.test.begin('global', function (test) {
  casper.start(pfx + 'global')
    .then(function () {
      // this.page.onError = function(err) {
      //   casper.echo('page error: ' + err);
      // }
      return this.waitForSelector('.LoadingSignal__spinning');
    })
    .then(function () {
      test.assertNotVisible('.LoadingSignal__spinning');

      this.thenClick('#load');
      return this.waitForSelector('.LoadingSignal__messageList');
    })
    .then(function () {
      test.assertVisible('.LoadingSignal__spinning');
      test.assertSelectorHasText('.LoadingSignal__messageList', 'file1');

      testSnapshots(test, 'global');
    })
    .then(function () {
      this.thenClick('#stop');
      return this.waitWhileSelector('.LoadingSignal__messageList');
    })
    .then(function () {
      this.thenClick('#stop');
      return this.waitWhileSelector('.LoadingSignal__messageList');
    })
    .then(function () {
      test.assertNotVisible('.LoadingSignal__spinning');
    });
  casper.run(function () {
    test.done();
  });
});
