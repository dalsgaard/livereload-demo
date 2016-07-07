var fs = require('fs');
var install = require("gulp-install");

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

    gulp.task(prefix + ':npm:install', function () {
      var src = [path + './package.json'];
      gulp.src(src).pipe(install({ args: ['prefix=../..'] }));
    });

    gulp.task(prefix + ':bower:install', function () {
      var src = [path + './bower.json'];
      gulp.src(src).pipe(install());
    });

    gulp.task(prefix + ':install', [
      prefix + ':npm:install',
      prefix + ':bower:install'
    ]);
  }

  function deps (names, postfix) {
    return names.map(function (name) {
      return 'module:' + name + postfix;
    });
  }

  var moduleNames = fs.readdirSync(__dirname + '/../modules');
  moduleNames.forEach(function (name) {
    init(name);
  });

  gulp.task('module:watch', deps(moduleNames, ':watch'));

};
