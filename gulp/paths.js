module.exports = {
    dest: 'assets/dist',
    js: [
        'app/app.module.js',
        'app/app.route.js',
        'app/shared/**/*.module.js',
        'app/shared/**/*.js',
        'app/components/**/*.js',
        'app/components/**/*.module.js'
    ],
    sass: ['app/shared/**/*.sass'],
    vendor_js: [
        'bower_components/angular/angular.min.js',
        'bower_components/jquery/dist/jquery.js',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/angular-material/angular-material.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-aria/angular-aria.min.js',
        'bower_components/angular-messages/angular-messages.min.js',
        'bower_components/firebase/firebase.js',
        'bower_components/angularfire/dist/angularfire.min.js',
        'bower_components/angular-material-icons/angular-material-icons.min.js',
        'assets/lib/angular-selectize/angular-selectize.js',
        'bower_components/angular-sanitize/angular-sanitize.js',
        'assets/lib/alertifyjs/build/alertify.min.js',
        'bower_components/vex/js/vex.combined.min.js',
        'bower_components/clipboard/dist/clipboard.min.js',
        'bower_components/marked/lib/marked.js',
        'bower_components/highlightjs/highlight.pack.js',
        'bower_components/angular-socialshare/angular-socialshare.min.js',
        'assets/lib/Recaptcha/googleRecaptchaAPI.js',
        'bower_components/angular-recaptcha/release/angular-recaptcha.min.js',
        'assets/lib/angular-screenfull/angular-screenfull.min.js',
        'assets/lib/screenfull/screenfull.min.js',
        'bower_components/selectize/dist/js/standalone/selectize.min.js'
    ],
    vendor_styles: [
        'bower_components/selectize/dist/css/selectize.css',
        'bower_components/material-design-lite/material.min.css',
        'bower_components/font-awesome/css/font-awesome.min.css',
        'assets/lib/alertifyjs/build/css/alertify.css',
        'assets/lib/alertifyjs/build/css/themes/semantic.min.css',
        'bower_components/vex/css/vex.css',
        'bower_components/vex/css/vex-theme-flat-attack.css',
        'assets/lib/material-charts/material-charts.min.css'
    ]
};