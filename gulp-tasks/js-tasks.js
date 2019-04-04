// Purpose:
// JS Lint
// Concatenate, sourcemap, & compile with babel
// Watch JS

// DEPENDENCIES:
// uses: browser-tasks.js

// 1. PACKAGES
// 2. VARIABLES
// 3. TASKS

'use strict';

// ================= //
// 1. PACKAGES       //
// ================= //

const gulp          = require('gulp');
const babel         = require("gulp-babel");
const browserSync   = require('browser-sync');

// Utility plugins:
const eslint        = require('gulp-eslint');
const sourcemaps    = require('gulp-sourcemaps');
const gulpif        = require('gulp-if');
const concat        = require('gulp-concat');
const newer         = require('gulp-newer');
const size          = require('gulp-size');
const debug         = require('gulp-debug');


// ================= //
// 2. VARIABLES      //
// ================= //

const config = require('../config-workflow.json');

const onError = function (error) {
  console.error.bind(error);
  this.emit('end');
}

// ================= //
// 3. TASKS          //
// ================= //

// Lint JS with eslint
// NOTE: eslintConfig in package.json
gulp.task('lint_js', function() {
  return gulp.src([config.jsSrc, '!' + config.jsLintIgnore]) // pass globs for files to target and ignore
    .pipe(eslint({ // environments listed in package.json
      rules: { // specify types of coding issues to warn about in console
        'no-cond-assign' : 1,
        'no-empty' : 1,
        'no-extra-semi' : 1,
        'no-obj-calls' : 1
      }
    }))
    .pipe(eslint.format('table'))
    .pipe(gulpif(!browserSync.active, eslint.failAfterError()));
});

// Concatenate, sourcemap, & compile with babel
gulp.task('compile_js', function(complete) {
  // Iterate through list of files to determine concatenation groups
  let propCount = 0;
  for (let prop in config.jsComponents) {
    let processGroup = function () {
      return config.jsComponents[prop].process
    }
    gulp.src(config.jsComponents[prop].filelist)
    .pipe(debug())
    .pipe(newer(config.build.js + config.jsComponents[prop].filename))
    .pipe(gulpif(processGroup, sourcemaps.init()))
    .pipe(concat(config.jsComponents[prop].filename))
    .pipe(gulpif(
      processGroup, babel({
        presets: ['@babel/preset-env']
      })) // Compile with BABEL!
    ) // END gulpif
    .on('error', onError)
    .pipe(size({
      title: config.jsComponents[prop].filename + ' -----> '
    }))
    .pipe(gulpif('!' + config.jsLintIgnore, sourcemaps.write('.')))
    .pipe(gulp.dest(config.build.js))
    .on('end', function() {
      // determine when the last concatenation loop has finished and call the callback that gulp passes to the task function so that gulp knows this task has completed.
      propCount += 1;
      if (propCount == Object.keys(config.jsComponents).length) {
          console.log(">>>>>>>>>>>> ended js concatting");
          complete();
      }
    });
  }
});

gulp.task('watch_js', function() {
  return gulp.watch(config.jsSrc, gulp.series('lint_js', 'compile_js', 'browser_reload'));
});
