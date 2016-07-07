var fs = require('fs');
var gulp = require('gulp');
var sass = require('gulp-sass');
//var livereload = require('gulp-livereload');

require('gulp-help')(gulp);

fs.readdirSync(__dirname + '/gulp').forEach(function (fn) {
  require(__dirname + '/gulp/' + fn)(gulp);
});

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
