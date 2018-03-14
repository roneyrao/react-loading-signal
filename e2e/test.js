const fs = require('fs');

const pfx = 'file:///' + fs.workingDirectory + '/e2e/index.html?dir=' + casper.cli.options.dir + '&entry=';
casper.options.remoteScripts = ['../node_modules/babel-polyfill/dist/polyfill.js'];
const resemble = require('resemblejs');
require('babel-polyfill');

casper.options.onError = function(err) {
  casper.echo('environment error' + err);
}

const snapshotDir = fs.workingDirectory + '/e2e/snapshots/';
function testSnapshot(name, selector) {
  const filePathNormal = snapshotDir + name + '.png';
  if (casper.cli.options.updateSnapshot) {
    casper[selector ? 'captureSelector' : 'capture'](filePathNormal, selector);
    return Promise.resolve();
  } else {
    const filePathTemp = snapshotDir + 'temp_' + name + '.png';

    casper[selector ? 'captureSelector' : 'capture'](filePathTemp, selector);

    return new Promise(function (resolve, reject) {
      resemble.compare(fs.read(filePathTemp), fs.read(filePathNormal), null, function (err, data) {
        try {
          // fs.remove(filePathTemp);
          if (err) {
            console.log(typeof err);
            reject(new Error('fail to compare snapshot'));
          } else {
            resolve(data);
          }
        } catch (err2) {
          console.log(err2);
          if (err) {
            reject(new Error('fail to compare snapshot' + err.message));
          } else {
            reject(err2);
          }
        }
      });
    });
  }
}

function evaluateSnapshot(test, name, selector) {
  var compared;
  testSnapshot(name, selector).then(function (data) {
    if (data) {
      test.assertEqual(data.misMatchPercentage, 100);
    }
    compared = true;
  }, function (err) {
    test.fail(err);
  })
  return function () {
    return compared;
  };
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

      this.waitFor(evaluateSnapshot(test, 'global'));
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

