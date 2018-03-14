const fs = require('fs');

const pfx = 'file:///' + fs.workingDirectory + '/e2e/index.html?dir=' + casper.cli.options.dir + '&entry=';
casper.options.remoteScripts = ['../node_modules/babel-polyfill/dist/polyfill.js'];
const resemble = require('resemblejs');
require('babel-polyfill');

casper.options.onError = function(err) {
  casper.echo('environment error' + err);
}

const snapshotDir = 'snapshots/';
function testSnapshot(name, selector) {
  const filePathNormal = snapshotDir + name + '.png';
  if (casper.cli.options.updateSnapshot) {
    casper[selector ? 'captureSelector' : 'capture'](filePathNormal, selector);
    return Promise.resolve();
  } else {
    const filePathTemp = snapshotDir + 'temp_' + name + '.png';

    casper[selector ? 'captureSelector' : 'capture'](filePathTemp, selector);

    return new Promise(function (resolve, reject) {
      resemble.compare(filePathTemp, filePathNormal, null, function (err, data) {
        if (err) {
          reject(new Error('fail to compare snapshot'));
        } else {
          try {
            fs.remove(filePathTemp);
            resolve(data);
          } catch (err2) {
            reject(err2);
          }
        }
      });
    });
  }
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

      var compared;
      testSnapshot('global').then(function (data) {
        console.log('compared')
        if ('misMatchPercentage' in data) {
          test.assertEqual(data.misMatchPercentage, 100);
        }
        compared = true;
      }, function (err) {
        test.fail(err);
      })
      this.waitFor(function () {
        return compared;
      });
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

