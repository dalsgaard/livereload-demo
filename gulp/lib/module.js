var exec = require('child_process').exec;

var del = require('del');
var sass = require('gulp-sass');

var utils = require('./utils');


module.exports = function (gulp) {

  gulp.task('clean', function () {
    return del(['./dist']);
  });

  gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dist/css'));
  });

  gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
  });

  gulp.task('install:bower', function () {
    return utils.exec('bower install');
  });

  gulp.task('install:npm', function () {
    return utils.exec('npm install');
  });

  gulp.task('install', ['install:npm', 'install:bower']);

  gulp.task('default', ['sass']);

};
