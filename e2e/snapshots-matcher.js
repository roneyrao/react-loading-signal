const fs = require('fs');
const resemble = require('resemblejs');

const snapshotDir = fs.workingDirectory + '/e2e/snapshots/';

function testSnapshot(name, selector) {
  const filePathNormal = snapshotDir + name + '.png';
  if (casper.cli.options.updateSnapshot) {
    casper[selector ? 'captureSelector' : 'capture'](filePathNormal, selector);
    return Promise.resolve({ rawMisMatchPercentage: 0 });
  } else {
    const filePathTemp = snapshotDir + 'temp_' + name + '.png';

    casper[selector ? 'captureSelector' : 'capture'](filePathTemp, selector);

    return new Promise(function (resolve, reject) {
      resemble.compare(filePathTemp, filePathNormal, function (err, data) {
        try {
          // fs.remove(filePathTemp);
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

module.exports = function matchSnapshots(name, selector) {
  const result = {
    match: undefined,
    error: undefined
  };

  testSnapshot(name, selector).then(function (data) {
    if (data) {
      console.log('mismatch percentage: ', data.rawMisMatchPercentage, ' less than 3');
      result.match = data.rawMisMatchPercentage < 3; // tolerant of spinning
    }
  }, function (err) {
    result.error = err;
  });

  result.wait = function () {
    return result.match !== undefined || result.error !== undefined;
  }

  return result;
}
