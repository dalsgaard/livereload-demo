var fs = require('fs');
var gulp = require('gulp');
var sass = require('gulp-sass');
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
  var path = './modules/' + name + '/dist';

  gulp.task('module:' + name + ':copy', function () {
    var src = path + '/css/**/*.css';
    var dest = './bower_components/' + name + '/dist/css';
    gulp.src(src).pipe(gulp.dest(dest));
  });

  gulp.task('module:' + name + ':watch', function () {
    var src = path + '/css/**/*.css';
    var task = 'module:' + name + ':copy';
    gulp.watch(src, [task]);
  });
}

var moduleNames = fs.readdirSync(__dirname + '/modules');
moduleNames.forEach(function (name) {
  createModule(name);
});

gulp.task('module:watch', moduleNames.map(function (name) {
  return 'module:' + name + ':watch';
}));
