// Purpose:
// Start browserSync server
// Reload browserSync server

// 1. PACKAGES
// 2. VARIABLES
// 3. TASKS

'use strict';

// ================= //
// 1. PACKAGES       //
// ================= //

const gulp          = require('gulp');
const browserSync   = require('browser-sync').create();


// ================= //
// 2. VARIABLES      //
// ================= //

const config = require('../config-workflow.json');


// ================= //
// 3. TASKS          //
// ================= //

gulp.task('browser_serve', function(done) {
  browserSync.init({
    server: config.build.root,
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: false
    }
  });
  done();
});

gulp.task('browser_reload', function(done) {
  browserSync.reload();
  done();
});
