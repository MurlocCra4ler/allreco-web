const gulp = require('gulp');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');
const eslint = require('gulp-eslint-new');
const uglify = require('gulp-uglify');
const browserify = require('gulp-browserify');
const babelify = require('babelify');


const srcFiles = 'src/**/*.ts';
const buildFiles = 'build/*.js';
const distFiles = 'dist/**/*.js';
const compFiles = 'dist/**/*.min.js';

const buildDir = 'build';
const distDir = 'dist';


gulp.task('lint', function() {
  return gulp.src(srcFiles)
    .pipe(eslint())
    .pipe(eslint.fix())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('build', function() {
  return gulp.src(srcFiles)
    .pipe(ts())
    .pipe(gulp.dest(buildDir));
});

gulp.task('distribute', async function() {
  return gulp.src(buildFiles)
    .pipe(browserify({
      transform: babelify.configure({
        presets: ['@babel/preset-env']
      })
    }))
    .pipe(gulp.dest(distDir))
});

gulp.task('compress', function() {
  return gulp.src(distFiles)
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(distDir));
});

gulp.task('clean-build', async function() {
  gulp.src(buildDir, {read: false})
    .pipe(clean());
})

gulp.task('clean-compressed', async function() {
  gulp.src(compFiles, {read: false})
    .pipe(clean());
})

gulp.task('default', function() {});
