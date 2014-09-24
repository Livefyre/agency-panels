var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var src = {
    imgs: './src/imgs/*.*',
    js: './src/*.js',
    sass: './src/sass/*.scss'
};

var dest = {
    css: './dist/css',
    imgs: './dist/imgs',
    js: './dist/js'

};

/**
 * TASK DEFINITIONS
 **/

// Compilation task
gulp.task('sass-build', function () {
    gulp.src(src.sass)
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dest.css));
});

gulp.task('imgs-build', function () {
    gulp.src(src.imgs)
        .pipe(gulp.dest(dest.imgs));
});

// Livereload server
gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: './',
            directory: true
        }
    });
});

gulp.task('sass-livereload', function () {
    return gulp.src(src.sass)
        .pipe(sass())
        .pipe(reload({stream: true}));
});

gulp.task('js-livereload', function () {
    return gulp.src(src.js)
        .pipe(reload({stream: true}));
});

gulp.task('imgs-livereload', function () {
    return gulp.src(src.imgs)
        .pipe(gulp.dest(dest.imgs))
        .pipe(reload({stream: true}));
});

/**
 * TARGET DEFINITIONS
 **/
 
// Default - livereload and continuous building
gulp.task('default', ['sass-livereload', 'imgs-livereload', 'browser-sync'], function () {
    gulp.watch(src.sass, ['sass-livereload']);
    gulp.watch(src.imgs, ['imgs-livereload']);
});

// Just build the files for deployment
gulp.task('build', ['sass-build', 'imgs-build'], function () {});
