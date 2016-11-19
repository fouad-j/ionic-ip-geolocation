var gulp = require('gulp');
var path = require("path");
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var addStream = require('add-stream');

var htmlmin = require('gulp-htmlmin');
var ngTemplate = require('gulp-angular-templatecache');

var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var plumber = require("gulp-plumber");
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');

var paths = {
  entry: 'src/index.html',
  templates: [
    'src/js/**/*.html',
    '!src/index.html'
  ],
  js: [
    'src/js/app.js',
    'src/js/**/*.js',
    '!src/**/*.spec.js'
  ],
  sass: ['./src/js/**/*.scss'],
  assets: './src/assets/**/*',
  dependenciesJS: [
    'src/lib/ionic/js/ionic.bundle.min.js',
    'src/lib/ngCordova/dist/ng-cordova.min.js'
  ],
};

var build = 'www/';

gulp.task('default', ['build-html', 'build-js', 'build-css', 'watch']);
gulp.task('serve:before', ['default']);

gulp.task('assets', function() {
  gulp.src('./src/manifest.json').pipe(gulp.dest(build));
  gulp.src('./src/lib/ionic/fonts/**.*').pipe(gulp.dest(path.join(build, 'css/fonts')));
  return gulp.src(paths.assets).pipe(gulp.dest(path.join(build, 'assets')));
});

gulp.task('build-html', function() {
  return gulp.src(paths.entry)
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      removeTagWhitespace: true
    }))
    .pipe(gulp.dest(build));
});

gulp.task('build-js', function () {
  (function(){
    gulp.src(paths.dependenciesJS)
    .pipe(concat('lib.min.js'))
    .pipe(gulp.dest(path.join(build, 'js')))
  })();

  function prepareTemplates() {
    return gulp.src(paths.templates)
      .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        removeTagWhitespace: true
      }))
      .pipe(ngTemplate({module: 'ipInformation'}));
  }

  return gulp.src(paths.js)
    .pipe(plumber())
    .pipe(babel({presets: ['es2015']}))
    .pipe(ngAnnotate())
    .pipe(addStream.obj(prepareTemplates()))
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest(path.join(build, 'js')));
});

gulp.task('build-css', ['assets'], function(done) {
  gulp.src('./src/app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    // .pipe(minifyCss({keepSpecialComments: 0}))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(path.join(build, 'css')))
    .on('end', done);
});

gulp.task('build', ['build-html', 'build-js', 'build-css']);

gulp.task('watch', function() {
  gulp.watch(paths.templates, ['build-html']);
  gulp.watch(paths.js, ['build-js']);
  gulp.watch(paths.sass, ['build-css']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
