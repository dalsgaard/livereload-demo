var exec = require('child_process').exec;
var fs = require('fs');

var utils = require('../lib/utils');


function deps (names, postfix) {
  return names.map(function (name) {
    return 'module:' + name + postfix;
  });
}

module.exports = function (gulp) {

  function init (name) {
    var path = './modules/' + name;
    var dist = path + '/dist';
    var prefix = 'module:' + name;

    // Watch

    gulp.task(prefix + ':copy', function () {
      var src = dist + '/css/**/*.css';
      var dest = './bower_components/' + name + '/dist/css';
      gulp.src(src).pipe(gulp.dest(dest));
    });

    gulp.task(prefix + ':watch', function () {
      var src = dist + '/css/**/*.css';
      var task = 'module:' + name + ':copy';
      gulp.watch(src, [task]);
    });

    // Install

    gulp.task(prefix + ':install:npm', function () {
      return utils.exec('gulp install:npm', { cwd: path });
    });

    gulp.task(prefix + ':install:bower', function () {
      return utils.exec('gulp install:bower', { cwd: path });
    });

    gulp.task(prefix + ':install', function (cb) {
      return utils.exec('gulp install', { cwd: path });
    });
  }

  var moduleNames = fs.readdirSync(__dirname + '/../../modules');
  moduleNames.forEach(function (name) {
    init(name);
  });

  gulp.task('module:watch', deps(moduleNames, ':watch'));

  gulp.task('module:install', deps(moduleNames, ':install'));

};
