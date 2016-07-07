var exec = require('child_process').exec;


exports.exec = function (command, options) {
  return new Promise(function (resolve, reject) {
    exec(command, options, function (err, stdout, stderr) {
      if (stdout) {
        console.log(stdout.trim());
      }
      if (stderr) {
        console.error(stderr.trim());
      }
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
