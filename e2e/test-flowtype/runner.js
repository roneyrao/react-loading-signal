const fs = require('path');
const { execFile, spawn } = require('child_process');
const { createReadStream } = require('fs');

function runFlow(streamOrString) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      './node_modules/.bin/flow',
      ['check-contents']
    );
    child.stdout.on('data', (data) => {
      // console.log(`stdout: ${data}`);
    });

    child.stderr.on('data', (data) => {
      // console.log(`stderr: ${data}`);
    });

    child.on('close', (code) => {
      // console.log(`child process exited with code ${code}`);
      if (code) {
        reject(code);
      } else {
        resolve();
      }
    });
    if (typeof streamOrString === 'string') {
      child.stdin.write(streamOrString, () => {
        console.log('write done');
      });
      child.stdin.end();
    } else {
      streamOrString.pipe(child.stdin);
    }
  });
}

function checkIncorrect(list) {
  // console.log(list.length);
  if (list.length > 0) {
    const ctn = list.shift();
    runFlow(ctn).then(() => {
      console.log('error should be thrown:');
      console.log(ctn);
      process.exit(1);
    }, (err) => {
      console.log('error found correctly');
      checkIncorrect(list);
    });
  } else {
    process.exit(0);
  }
}

runFlow(createReadStream(fs.resolve(__dirname, './fixture-correct.js')))
  .then(() => {
    console.log('correct flow check done');
    checkIncorrect(require('./fixture-incorrect.js'));
  }, (err) => {
    process.exit(err.code);
  });
