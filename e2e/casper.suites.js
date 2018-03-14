require('babel-polyfill');

const fs = require('fs');
const resemble = require('resemblejs');

const pfx = 'file:///' + fs.workingDirectory + '/e2e/index.html?dir=' + casper.cli.options.dir + '&entry=';
const snapshotDir = fs.workingDirectory + '/e2e/snapshots/';

casper.options.remoteScripts = ['../node_modules/babel-polyfill/dist/polyfill.js'];

casper.options.onError = function(err) {
  casper.echo('environment error' + err);
}

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
        try {
          fs.remove(filePathTemp);
          if (err) {
            reject(new Error('fail to compare snapshot'));
          } else {
            resolve(data);
          }
        } catch (err2) {
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
        if (data) {
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

casper.test.begin('local', function (test) {
  casper.start(pfx + 'local')
    .then(function () {
      return this.waitForSelector('.LoadingSignal__spinning');
    })
    .then(function () {
      test.assertNotVisible('.LoadingSignal__blobs');

      return this.thenClick('#load');
    })
    .then(function () {
      test.assertVisible('.LoadingSignal__blobs');
      test.assertEqual(this.getElementAttribute('#load', 'class'), 'disabled');
      test.assertEqual(this.getElementAttribute('#load', 'disabled'), 'disabled');

      var compared;
      testSnapshot('local').then(function (data) {
        test.assertEqual(data.misMatchPercentage, 100);
        compared = true;
      })
      this.waitFor(function () {
        return compared;
      });
    })
    .then(function () {
      return this.thenClick('#stop');
    })
    .then(function () {
      test.assertNotVisible('.LoadingSignal__blobs');
      test.assertEqual(this.getElementAttribute('#load', 'class'), '');
      test.assertEqual(this.getElementAttribute('#load', 'disabled'), '');
    });
  casper.run(function () {
    test.done();
  });
});

casper.test.begin('container', function (test) {
  casper.start(pfx + 'container')
    .then(function () {
      return this.waitForSelector('.LoadingSignal__spinning');
    })
    .then(function () {
      test.assertDoesntExist('.LoadingSignal__blobs');

      return this.thenClick('#load');
    })
    .then(function () {
      test.assertVisible('.LoadingSignal__blobs');
      test.assertEval(function () {
        return __utils__.findOne('.LoadingSignal__local').parentNode === __utils__.findOne('#box');
      });

      return this.thenClick('#removeContainer');
    })
    .then(function () {
      test.assertDoesntExist('.LoadingSignal__blobs');
      test.assertEqual(this.getElementAttribute('#load', 'class'), 'disabled');

      return this.thenClick('#restoreContainer');
    })
    .then(function () {
      test.assertVisible('.LoadingSignal__blobs');
      test.assertEval(function () {
        return __utils__.findOne('.LoadingSignal__local').parentNode === __utils__.findOne('#load').parentNode;
      });
    })
  casper.run(function () {
    test.done();
  });
});

casper.test.begin('multiple', function (test) {
  casper.start(pfx + 'multiple')
    .then(function () {
      return this.waitForSelector('.LoadingSignal__spinning');
    })
    .then(function () {
      this.thenClick('#load');
      return this.wait(500);
    })
    .then(function () {
      test.assertVisible('.LoadingSignal__spinning');
      test.assertVisible('.LoadingSignal__blobs');
      test.assertSelectorHasText('.LoadingSignal__messageList', 'file1file3');

      this.thenClick('#stop1');
      return this.wait(500);
    })
    .then(function () {
      test.assertVisible('.LoadingSignal__spinning');
      test.assertVisible('.LoadingSignal__blobs');
      test.assertSelectorHasText('.LoadingSignal__messageList', 'file3');

      this.thenClick('#stop2');
      return this.wait(500);
    })
    .then(function () {
      test.assertVisible('.LoadingSignal__spinning');
      test.assertNotVisible('.LoadingSignal__blobs');
      test.assertSelectorHasText('.LoadingSignal__messageList', 'file3');
      this.thenClick('#stop3');
      return this.wait(500);
    })
    .then(function () {
      test.assertDoesntExist('.LoadingSignal__messageList');
    })
  casper.run(function () {
    test.done();
  });
});

casper.test.begin('progress', function (test) {
  casper.start(pfx + 'progress')
    .then(function () {
      return this.waitForSelector('.LoadingSignal__spinning');
    })
    .then(function () {
      this.thenClick('#load');
      return this.waitForSelector('.LoadingSignal__progressBar');
    })
    .then(function () {
      test.assertVisible('.LoadingSignal__progressBar > div');
      var boxWidth = this.getElementBounds('.LoadingSignal__progressBar').width;
      this.waitFor(function () {
        return this.getElementBounds('.LoadingSignal__progressBar > div').width / boxWidth > 0.1;
      });
      this.waitFor(function () {
        return this.getElementBounds('.LoadingSignal__progressBar > div').width / boxWidth > 0.5;
      });
      this.waitFor(function () {
        return this.getElementBounds('.LoadingSignal__progressBar > div').width / boxWidth > 0.7;
      });

      return this.waitWhileVisible('.LoadingSignal__progressBar');
    })
  casper.run(function () {
    test.done();
  });
});

casper.test.begin('both global and local', function (test) {
  casper.start(pfx + 'both')
    .then(function () {
      return this.waitForSelector('.LoadingSignal__spinning');
    })
    .then(function () {
      test.assertNotVisible('.LoadingSignal__spinning');
      test.assertNotVisible('.LoadingSignal__blobs');

      this.thenClick('#load');
      return this.waitForSelector('.LoadingSignal__messageList');
    })
    .then(function () {
      test.assertVisible('.LoadingSignal__spinning');
      test.assertVisible('.LoadingSignal__blobs');
      test.assertSelectorHasText('.LoadingSignal__messageList', 'file1');

      this.thenClick('#stop');
      return this.waitWhileSelector('.LoadingSignal__messageList');
    })
    .then(function () {
      test.assertNotVisible('.LoadingSignal__spinning');
      test.assertNotVisible('.LoadingSignal__blobs');
    });
  casper.run(function () {
    test.done();
  });
});
