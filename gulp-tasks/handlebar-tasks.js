// Purpose:
// Compile handlebars
// Watch handlebar files

// 1. PACKAGES
// 2. VARIABLES
// 3. TASKS

'use strict';

// ================= //
// 1. PACKAGES       //
// ================= //

const gulp          = require('gulp');
const handlebars    = require('gulp-hb');
const touch         = require('gulp-touch-cmd');


// ================= //
// 2. VARIABLES      //
// ================= //

const config = require('../config-workflow.json');


// ================= //
// 3. TASKS          //
// ================= //

// Compile handlebars
gulp.task('compile_handlebars', function (done) {
  const hbStream = handlebars({ debug: true })
    // Partials
    .partials( config.handlebars.hbsPartials )

    // Helpers
    .helpers( config.handlebars.hbsHelpers )

    // Decorators
    // .decorators( config.handlebars.hbsDecorators )

    // Data
    .data( config.handlebars.hbsData )

  return gulp
    .src(['!' + config.handlebars.hbsTemplates, config.handlebars.hbsSrc])
    .pipe(hbStream)
    .pipe(gulp.dest(config.build.root))
    .pipe(touch());
    done();
});

// Watch handlebar files
gulp.task('watch_hbs', function() {
  return gulp.watch([
      config.handlebars.hbsSrc,
      config.handlebars.hbsComponents
    ],
    gulp.series('compile_handlebars', 'browser_reload'));
});
