var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
var runSequence = require('gulp-run-sequence');
var NwBuilder = require('node-webkit-builder');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var brfs = require('brfs');

var nwOverlayFrontend = new NwBuilder({
    files: ['./**/**', '!./build/**/**', '!./cache/**/**', '!./node_modules/**/**'],
    buildDir: './build',
    platforms: ['osx32', 'osx64', 'win32', 'win64'],
    appName: 'TwitchOverlayFrontend'
});

var paths = {
    sass: ['./sass/**/*.scss'],
    cssLibs: [
        './bower_components/bootstrap/dist/css/bootstrap.css',
        './bower_components/fontawesome/css/font-awesome.css'
    ],
    jsLibs: [
        './bower_components/jquery/dist/jquery.js',
        './bower_components/angular/angular.js',
        './bower_components/ui-router/release/angular-ui-router.min.js'
    ],
    js: [
        './overlay/paths.js',
        './overlay/app.js',
        './overlay/**/*.js',
        './build/components.max.js',
        './vendor/**/*.js'
    ]
};

gulp.task('build-components', function() {

    var bundler = browserify({
        entries: ['./components/component-factory.js'],
        debug: true,
        transform: 'brfs'
    });

    var bundle = function() {
        return bundler
            .transform(brfs)
            .bundle()
            .pipe(source('components.max.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            // Add transformation tasks to the pipeline here.
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./build'));
    };

    return bundle();
});

gulp.task('default', function (done) {
    runSequence('clean', ['sass', 'build-components'], 'inject', done);
});

gulp.task('sass', function (done) {
    gulp.src(paths.sass)
        .pipe(sass())
        .pipe(gulp.dest('./css/'))
        .pipe(rename({extname: '.css'}))
        .pipe(gulp.dest('./css/'))
        .on('end', done);
});


gulp.task('inject', function () {
    var target = gulp.src('./index-template.html');
    var sources = gulp.src(paths.jsLibs.concat(paths.js, paths.cssLibs, './css/*.css'), {read: false});
    return target.pipe(inject(sources, {addRootSlash: false}))
        .pipe(rename({basename: 'index'}))
        .pipe(gulp.dest('./'));
});

var rimraf = require('gulp-rimraf');

gulp.task('clean', function () {
    return gulp.src('./css/**/**', {read: false}) // much faster
        .pipe(rimraf());
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('build', function () {
    return nwOverlayFrontend.build()
});