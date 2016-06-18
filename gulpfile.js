var gulp = require('gulp'),
    clean = require('gulp-clean'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sourceMaps = require('gulp-sourcemaps'),
    util = require('gulp-util'),
    sass = require('gulp-sass'),
//    browserSync = require('browser-sync').create(),
    combiner = require('stream-combiner2'),
    autoprefixer = require('gulp-autoprefixer'),
    paths = require('./gulp/paths'),
    minifyCss = require('gulp-minify-css'),
    rename = require('gulp-rename');



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
//        .pipe(browserSync.stream());
});

gulp.task('serve', ['sass', 'scripts'], function () {
    /*browserSync.init({
         ui: {
           port: 8080
          },
        port:8080,
         host: process.env.IP,
        server: {
            port: 8080,
            baseDir: './',
        }
    });*/

    gulp.watch('**/**/*.html').on('change'/*, browserSync.reload*/);
    gulp.watch('./app/**/**/*.scss', ['sass']);
    gulp.watch('./app/**/*.js', ['scripts']);
    gulp.watch('./assets/dist/*.js').on('change'/*, browserSync.reload*/);
});

gulp.task('watch', function(){
    gulp.watch('./app/**/**/*.scss', ['sass', 'compileSCSS']);
    gulp.watch('./app/**/*.js', ['scripts']);
})

gulp.task('build', ['sass', 'scripts']);


/////////////////////////////////////////////

gulp.task('compileSCSS', 

                         [
                            '404SCSS','authSCSS', 'authDescSCSS', 
                            'authHomeSCSS', 'homeSCSS','loadingSCSS',
                            'newReplySCSS','newTopicSCSS', 'otherUserProfilePageSCSS',
                            'profileSCSS', 'settingsSCSS', 'topicSCSS'
                         ]
          )


gulp.task('authSCSS', function(done){
    gulp.src('app/components/auth/sass/auth.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/HISTORY/CSS/authSCSS'))
        .pipe(minifyCss({
              keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('app/components/auth/css'))
        .on('end', done)
})

gulp.task('404SCSS', function(done){
    gulp.src('app/components/404/sass/404.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/HISTORY/CSS/404SCSS'))
        .pipe(minifyCss({
              keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('app/components/404/css'))
        .on('end', done)
})

gulp.task('authDescSCSS', function(done){
    gulp.src('app/components/authDesc/sass/authDesc.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/HISTORY/CSS/authDescSCSS'))
        .pipe(minifyCss({
              keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('app/components/authDesc/css'))
        .on('end', done)
})

gulp.task('authHomeSCSS', function(done){
    gulp.src('app/components/authHome/sass/authHome.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/HISTORY/CSS/authHomeSCSS'))
        .pipe(minifyCss({
              keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('app/components/authHome/css'))
        .on('end', done)
})

gulp.task('homeSCSS', function(done){
    gulp.src('app/components/home/sass/homeMat.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/HISTORY/CSS/homeSCSS'))
        .pipe(minifyCss({
              keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('app/components/home/css'))
        .on('end', done)
})

gulp.task('loadingSCSS', function(done){
    gulp.src('app/components/loading/sass/loading.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/HISTORY/CSS/loadingSCSS'))
        .pipe(minifyCss({
              keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('app/components/loading/css'))
        .on('end', done)
})

gulp.task('newReplySCSS', function(done){
    gulp.src('app/components/newReply/sass/newReply.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/HISTORY/CSS/newReplySCSS'))
        .pipe(minifyCss({
              keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('app/components/newReply/css'))
        .on('end', done)
})

gulp.task('newTopicSCSS', function(done){
    gulp.src('app/components/newTopic/sass/newTopic.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/HISTORY/CSS/newTopicSCSS'))
        .pipe(minifyCss({
              keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('app/components/newTopic/css'))
        .on('end', done)
})

gulp.task('otherUserProfilePageSCSS', function(done){
    gulp.src('app/components/otherUserProfilePage/sass/otherUserProfilePage.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/HISTORY/CSS/otherUserProfilePageSCSS'))
        .pipe(minifyCss({
              keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('app/components/otherUserProfilePage/css'))
        .on('end', done)
})

gulp.task('profileSCSS', function(done){
    gulp.src('app/components/profile/sass/profile.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/HISTORY/CSS/profileSCSS'))
        .pipe(minifyCss({
              keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('app/components/profile/css'))
        .on('end', done)
})

gulp.task('settingsSCSS', function(done){
    gulp.src('app/components/settings/sass/settings.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/HISTORY/CSS/settingsSCSS'))
        .pipe(minifyCss({
              keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('app/components/settings/css'))
        .on('end', done)
})

gulp.task('topicSCSS', function(done){
    gulp.src('app/components/topic/sass/topicDesc.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('assets/HISTORY/CSS/topicSCSS'))
        .pipe(minifyCss({
              keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('app/components/topic/css'))
        .on('end', done)
})
