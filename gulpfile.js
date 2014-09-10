var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var source = {
    imgs: './src/imgs/*.*',
    js: './src/*.js',
    sass: './src/sass/*.scss'
};

var dest = {
    css: './dist/css',
    imgs: './dist/imgs'
};

/**
 * TASK DEFINITIONS
 **/

// Compilation task
gulp.task('sass-build', function () {
    gulp.src(source.sass)
        .pipe(sass())
        .pipe(gulp.dest(dest.css));
});

gulp.task('imgs-build', function () {
    gulp.src(source.imgs)
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
    return gulp.src(source.sass)
        .pipe(sass())
        .pipe(gulp.dest(dest.css))
        .pipe(reload({stream: true}));
});

gulp.task('js-livereload', function () {
    return gulp.src(source.js)
        .pipe(reload({stream: true}));
});

gulp.task('imgs-livereload', function () {
    return gulp.src(source.imgs)
        .pipe(gulp.dest(dest.imgs))
        .pipe(reload({stream: true}));
});

/**
 * TARGET DEFINITIONS
 **/
 
// Default - livereload and continuous building
gulp.task('default', ['sass-livereload', 'imgs-livereload', 'browser-sync'], function () {
    gulp.watch(source.sass, ['sass-livereload']);
    gulp.watch(source.imgs, ['imgs-livereload']);
});

// Just build the files for deployment
gulp.task('build', ['sass-build', 'imgs-build'], function () {});
