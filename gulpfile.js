const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
let reload = browserSync.reload;
const uglifyjs = require('uglify-es');
const composer = require('gulp-uglify/composer');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const pump = require('pump');

const scripts = require('./src/scripts');
const appScripts = require('./src/appScripts');
const styles = require('./src/styles');

var devMode = false;
var minify = composer(uglifyjs, console);

gulp.task('clean', function() {
  return del(['build']);
});

gulp.task('css', function() {
  gulp.src(styles)
    .pipe(concat('main.css'))
    .pipe(csso())
    .pipe(cleanCSS())
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('js', ['clean'], function(cb) {
  pump([
    gulp.src(scripts),
    minify(),
    concat('scripts.js'),
    gulp.dest('./public/js')
  ], cb);
});

gulp.task('appJS', ['clean'], function(cb) {
  pump([
    gulp.src(appScripts),
    sourcemaps.init(),
    concat('appScripts.js'),
    sourcemaps.write(),
    gulp.dest('./public/js'),
    browserSync.reload({
      stream: true
    })
  ], cb);
});

gulp.task('html', function() {
  gulp.src('./src/html/**/*.html')
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('images', ['clean'], function() {
  return gulp.src('./src/img/**/*.*')
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('./public/img'));
});

gulp.task('builder', function() {
  gulp.start(['css','appJS','html', 'images']);
});

gulp.task('serve', ['browser-sync'], function() {
  gulp.watch('./src/css/**/*.css', ['css']);
  gulp.watch('./src/js/**/*.js', ['appJS']);
  gulp.watch('./src/html/**/*.html', ['html']);
  gulp.watch('./src/img/**/*.*', ['images']);
});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
    port: 1122,
    open: false
  });
});

gulp.task('nodemon', [], function (done) {
	var running = false;

	return nodemon({
		script: 'server.js',
    watch: ['./public/**/*.*', './controllers/**/*.*'],
    ignore: [ 'gulpfile.js', 'node_modules/' ]
	}).on('start', function () {
		if (!running) done();
    running = true;
	})
  .on('restart', function () {
    setTimeout(function () {
      reload();
    }, 1000);
  });
});

gulp.task('start', ['builder', 'serve']);
