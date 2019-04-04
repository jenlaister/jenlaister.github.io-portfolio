// Purpose:
// Compile SASS, autoprefix css, & sourcemap
// Watch SASS

// DEPENDENCIES:
// uses: browser-tasks.js
// NOTE: `gulp-autoprefixer` uses key browserslist in package.json
// ^^^^ read more at https://github.com/postcss/autoprefixer#options

// 1. PACKAGES
// 2. VARIABLES
// 3. TASKS

'use strict';

// ================= //
// 1. PACKAGES       //
// ================= //

const gulp          = require('gulp');
const sass          = require('gulp-sass');
const sassGlob      = require('gulp-sass-glob');
const autoprefixer  = require('gulp-autoprefixer');
const sourcemaps    = require('gulp-sourcemaps');
const touch         = require('gulp-touch-cmd');


// ================= //
// 2. VARIABLES      //
// ================= //

const config = require('../config-workflow.json');


// ================= //
// 3. TASKS          //
// ================= //

gulp.task('compile_sass', function (done) {
 return gulp.src(config.src.sassSrc)
  .pipe(sourcemaps.init())
  .pipe(sassGlob())
  .pipe(sass({
    outputStyle: 'compressed',
    includePaths: [
      './node_modules/bootstrap/scss',
      './node_modules/ins-arik-style-guide'
    ]
  })
  .on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(config.build.css))
  .pipe(touch());
  done();
});

gulp.task('watch_sass', function() {
  return gulp.watch(config.src.sassSrc, gulp.series('compile_sass', 'browser_reload'));
});
