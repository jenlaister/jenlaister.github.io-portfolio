// Purpose:
// move img files
// watch img files
// watch all assets

// DEPENDENCIES:


// 1. PACKAGES
// 2. VARIABLES
// 3. TASKS

'use strict';

// ================= //
// 1. PACKAGES       //
// ================= //

const gulp          = require('gulp');
const newer         = require('gulp-newer');
const size          = require('gulp-size');


// ================= //
// 2. VARIABLES      //
// ================= //

const config = require('../config-workflow.json');


// ================= //
// 3. TASKS          //
// ================= //

// move img files
gulp.task('move_img', function() {
  return gulp.src(config.src.imgSrc)
    .pipe(newer(config.build.img))
    .pipe(size({
      title: 'IMAGES INFO:',
      showFiles: true
    }))
    .pipe(gulp.dest(config.build.img));
});

// watch img files
gulp.task('watch_img', function() {
  return gulp.watch(config.src.imgSrc,
    gulp.series( 'move_img', 'browser_reload')
  );
});

// move font files
gulp.task('move_font', function() {
  return gulp.src(config.src.fontSrc)
    .pipe(newer(config.build.font))
    .pipe(gulp.dest(config.build.font));
});

// watch font files
gulp.task('watch_font', function() {
  return gulp.watch(config.src.fontSrc,
    gulp.series( 'move_font', 'browser_reload')
  );
});

// move font files
gulp.task('move_json', function() {
  return gulp.src(config.src.jsonSrc)
    .pipe(newer(config.build.json))
    .pipe(gulp.dest(config.build.json));
});

// watch font files
gulp.task('watch_json', function() {
  return gulp.watch(config.src.jsonSrc,
    gulp.series( 'move_json', 'browser_reload')
  );
});

// watch all assets
gulp.task('watch_assets', function() {
  return gulp.watch(config.build.assetsSrc, gulp.series('browser_reload'));
});
