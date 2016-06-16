//Require Gulp
var gulp = require("gulp"),
     ngAnnotate = require("gulp-ng-annotate"),
     uglify = require("gulp-uglify"),
     concat = require("gulp-concat"),
     sourceMaps = require("gulp-sourcemaps"),
     util = require('gulp-util'),
     coffee = require("gulp-coffee"),
     clean = require("gulp-clean"),
     expect = require('gulp-expect-file'),
     sass = require('gulp-sass'),
     es = require('event-stream'),
     $ = require('gulp-load-plugins')(), 
     minifyCss = require('gulp-minify-css'),
     rename = require('gulp-rename'),
     browserSync = require('browser-sync').create(),
     webserver = require('gulp-webserver'),
     combiner = require('stream-combiner2');

var base = 'app';
// var minifyCss = require('gulp-minify-css');

var paths = require("./gulp/paths");
var PATHS_SASS = {
    scss_org : [
        'app/components/404/sass/404.scss',
        'app/components/auth/sass/auth.scss'
    ],  
    css_dest : [
        'app/components/404/css',
        'app/components/auth/css'
    ]
    
}
// combines all js files into one and create sourcemaps for them
gulp.task('scripts', function() {
    var combined = combiner.obj([
        gulp.src(paths.js),
        sourceMaps.init(),
        ngAnnotate(),
        concat('app.min.js'),
        uglify(),
        sourceMaps.write('.'),
        gulp.dest(paths.dest)
        ]);
        
  combined.on('error', console.error.bind(console));

  return combined;
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('**/**/*.html').on('change', browserSync.reload);
    gulp.watch("app/components/**/**/*{.js}", ["scripts"]);
    gulp.watch("app/components/**/**/*.scss", ['test']);
})



gulp.task('serve', function() {
  gulp.src('./')
    .pipe(webserver({
      port:8080,
      host: process.env.IP,
      fallback: 'index.html',
      livereload: {
        enable: true, 
        filter: function(fileName) {
          if (fileName.match(/.map$/))  
            return false;
           else 
            return true;
        }
      }
    }));
});



//IN CONSTRUCTION BEGIN
gulp.task('sass', function() {
  return Object.keys(PATHS_SASS).forEach(function(key) {
            	Object.keys(PATHS_SASS[key]).forEach(function(childKey) {
            	      console.log(childKey, PATHS_SASS[key][childKey]);
            	          gulp.src(PATHS_SASS.scss_org[i])
                             .pipe(sass().on('error', sass.logError))
                             .pipe(gulp.dest('assets/history/css'))
                             .pipe(minifyCss({
                               keepSpecialComments: 0
                             }))
                             .pipe(rename({ extname: '.min.css' }))
                             .pipe(gulp.dest(PATHS_SASS.css_dest[i]))
            	})
         });

});
//IN CONSTRUCTION END

gulp.task('sass', function(done) {
  return gulp.src(['sass/**/*.sass'])
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css/'))
    .on('end', done)
});


gulp.task('copy', function() {
  var files = ['bower_components/angular/angular.min.js'];
  return gulp.src(files)
    .pipe(expect(files))
});


gulp.task('scripts:vendor', function() {
   return gulp.src(paths.vendor_js)
     .pipe(concat('vendor.min.js'))
     .pipe(uglify({ mangle: false, compress:true, output: { beautify: false } }))
     .pipe(gulp.dest(paths.dest));
});


//GULP FILE ADDED LATER

gulp.task('coffee', function(done) {
    gulp.src('app/shared/**/*.coffee')
        .pipe(coffee())
        .pipe(uglify().on('error', util.log))
        .pipe(gulp.dest('app/shared/jscoffee'))
})

//  gulp.task('sass', function(done) {
//      gulp.src('app/shared/**/*.sass')
//          .pipe(sass().on('error', sass.logError))
//          .pipe(gulp.dest('app/shared/css'))
//  })

gulp.task('css-sass', function(done) {
    var SASSPrep = gulp.src('app/shared/**/*.sass')
                        .pipe(sass().on('error', sass.logError))
    
    var CSS = gulp.src('app/shared/**/*.css')
    
    return es.merge(SASSPrep,CSS)
    .pipe(concat('all-css.css'))
    .pipe(uglify().on('error', util.log))
    .pipe(gulp.dest('app/components/shared/allCSS'))
})






gulp.task('CUSTOM_scripts', function(done){
    var MAIN_APP = gulp.src('app/app.module.js')
     .pipe(uglify())
     
    var MAIN_CONFIG = gulp.src('app/app.config.js')
      .pipe(uglify())
      
    var CONTROLLERS =    gulp.src('app/components/**/**/*.js')
     .pipe(uglify())
     
     
     return es.merge(MAIN_APP,MAIN_CONFIG,CONTROLLERS)
     .pipe(concat('app.main.js'))
          .pipe(gulp.dest('dist'))
})

gulp.task('CUSTOM_scripts:vendor', function(done){
        var JQUERY_LIB =  '../bower_components/jquery/dist/jquery.js'
        var ANGULAR_LIB =  '../bower_components/angular/angular.min.js'
        var SVG_ASSETS_LIB =  '../assets/lib/svg-assets-cache/svg-assets-cache.js'
        var ALERTIFY_LIB =  '../node_modules/alertifyjs/build/alertify.min.js'
        var RECAPTCHA_LIB =  '../assets/lib/Recaptcha/googleRecaptchaAPI.js'
        var SCREENFULL_LIB =  '../assets/lib/angular-screenfull/angular-screenfull.min.js'
        var SCREENFULL_STAND_LIB =  '../assets/lib/screenfull/screenfull.min.js'
        var SELECTIZE_LIB =  '../assets/lib/angular-selectize/angular-selectize.js'
        
        return es.merge(JQUERY_LIB,ANGULAR_LIB,SVG_ASSETS_LIB,ALERTIFY_LIB,RECAPTCHA_LIB,SCREENFULL_LIB,SCREENFULL_STAND_LIB,SELECTIZE_LIB)
     .pipe(concat('app.vendor.js'))
          .pipe(uglify())
          .pipe(gulp.dest('dist'))
})

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
        .pipe(minifyCss({
              keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('app/components/topic/css'))
        .on('end', done)
})




