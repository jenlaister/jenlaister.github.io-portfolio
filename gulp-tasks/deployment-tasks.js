// Purpose:


// DEPENDENCIES:


// 1. PACKAGES
// 2. VARIABLES
// 3. TASKS

'use strict';

// ================= //
// 1. PACKAGES       //
// ================= //

const gulp          = require('gulp');
const htmlmin       = require('gulp-htmlmin');
const cssnano       = require('gulp-cssnano');
const uglify        = require('gulp-uglify');
const imagemin      = require('gulp-imagemin');

// Utility plugins:
const gulpif        = require('gulp-if');
const newer         = require('gulp-newer');
const size          = require('gulp-size');


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

// Minify HTML and move to dist_dir
gulp.task('deploy_html', function() {
  return gulp.src([config.build.htmlSrc])
    .pipe(newer(config.dist.root))
    .pipe(gulpif('*.html',
      htmlmin({
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        collapseBooleanAttributes: true,
        minifyCSS: true,
        minifyJS: true,
        removeEmptyAttributes: true
      })
    ))
    .on('error', onError)
    .pipe(gulpif('*.html',
      size({
        title: 'HTML Minify',
        showFiles: true
      })
    ))
    .pipe(gulp.dest(config.dist.root));
});

// Minify CSS and move to dist_dir
gulp.task('deploy_css', function() {
  return gulp.src([config.build.cssSrc, '!' + config.build.cssMapSrc ])
    .pipe(newer(config.dist.css))
    .on('error', onError)
    .pipe(size({
      title: 'CSS INFO:',
      showFiles: true
    }))
    .pipe(gulp.dest(config.dist.css));
});

// Minify JavaScript and move to dist_dir
gulp.task('deploy_js', function() {
  return gulp.src(config.build.jsSrc)
    .pipe(newer(config.dist.js))
    .pipe(gulpif('!' + config.jsLintIgnore, uglify()))
    .on('error', onError)
    .pipe(size({
      title: 'SCRIPTS INFO:',
      showFiles: true
    }))
    .pipe(gulp.dest(config.dist.js));
});

// Minify images and move to dist_dir
gulp.task('deploy_img', function() {
  return gulp.src(config.build.imgSrc)
    .pipe(newer(config.dist.img))
    .pipe(imagemin({
      verbose:true // init image minification and make console output verbose
    }))
    .on('error', onError)
    .pipe(size({
      title: 'IMAGES INFO:',
      showFiles: true
    }))
    .pipe(gulp.dest(config.dist.img));
});

// Move additional assets
gulp.task('deploy_miscAssets', function() {
  return gulp.src(config.build.assetsSrc, { allowEmpty: true })
    .pipe(newer(config.dist.root))
    .pipe(size({
      title: 'MISC:',
      showFiles: true
    }))
    .pipe(gulp.dest(config.dist.root));
});

// Process files for production.
gulp.task('dist',
  gulp.series('deploy_html', 'deploy_css', 'deploy_js', 'deploy_img', 'deploy_miscAssets')
);
