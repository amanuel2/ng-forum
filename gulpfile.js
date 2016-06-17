var gulp = require('gulp'),
    clean = require('gulp-clean'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sourceMaps = require('gulp-sourcemaps'),
    util = require('gulp-util'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    combiner = require('stream-combiner2'),
    autoprefixer = require('gulp-autoprefixer'),
    paths = require('./gulp/paths');


gulp.task('clean', function () {
    return gulp.src(paths.dest)
        .pipe(clean());
});

// combines all js files into one and create sourcemaps for them
gulp.task('scripts', function () {
    var combined = combiner.obj([
        gulp.src(paths.js),
        sourceMaps.init(),
        ngAnnotate(),
        concat('app.min.js'),
        uglify(),
        sourceMaps.write(paths.dest),
        gulp.dest(paths.dest)
    ]);

    combined.on('error', console.error.bind(console));
    return combined;
});

gulp.task('scripts:vendor', function () {
    return gulp.src(paths.vendor_js)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest));
});

gulp.task('sass', function () {
    var opts = {
        errLogToConsole: true,
        outputStyle: 'compressed',
        indentedSyntax: true
    };

    return gulp.src(['sass/**/*.sass'])
        .pipe(sourceMaps.init())
            .pipe(autoprefixer())
            .pipe(sass(opts).on('error', sass.logError))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(paths.dest))
        .pipe(browserSync.stream());
});


gulp.task('serve', ['sass', 'scripts'], function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('**/**/*.html').on('change', browserSync.reload);
    gulp.watch('./app/**/**/*.sass', ['sass']);
    gulp.watch('./app/**/*.js', ['scripts']);
    gulp.watch('./assets/dist/*.js').on('change', browserSync.reload);
});

gulp.task('build', ['sass', 'scripts', 'scripts']);
