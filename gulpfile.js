var fs = require('fs');
var gulp = require('gulp');
var sass = require('gulp-sass');
var install = require("gulp-install");
//var livereload = require('gulp-livereload');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass:watch', function () {
  var src = './sass/**/*.scss';
  gulp.watch(src, ['sass']);
});

gulp.task('default');

/*
    Modules
*/

function createModule (name) {
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

var moduleNames = fs.readdirSync(__dirname + '/modules');
moduleNames.forEach(function (name) {
  createModule(name);
});

gulp.task('module:watch', moduleNames.map(function (name) {
  return 'module:' + name + ':watch';
}));
