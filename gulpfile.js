'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    less = require('gulp-less'),
    cssmin = require('gulp-minify-css'),
    //prefixer = require('gulp-autoprefixer'),
    //uglify = require('gulp-uglify'),
    //sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    //imagemin = require('gulp-imagemin'),
    //pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'public/',
        php: 'public/',
        js: 'public/assets/js/',
        css: 'public/assets/css/',
        fonts: 'public/assets/fonts/',
        img: 'public/assets/media/img/',
        video: 'public/assets/media/video/'
    },
    src: {
        html: 'src/html/*.html',
        php: 'src/php/*.php',
        js: 'src/assets/js/*.js',
        style: 'src/assets/less/*.less',
        fonts: 'src/assets/fonts/**/*.*',
        img: 'src/assets/img/**/*.*',
        video: 'src/assets/video/**/*.*'
    },
    watch: {
        html: 'src/html/**/*.html',
        php: 'src/php/**/*.php',
        js: 'src/assets/js/**/*.js',
        style: 'src/assets/less/**/*.less',
        fonts: 'src/assets/fonts/**/*.*',
        img: 'src/assets/img/**/*.*',
        video: 'src/assets/video/*.*'
    },
    clean: './public'
};

var config = {
    server: {
        baseDir: "./public"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_:"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
 gulp.src(path.src.html)
 .pipe(rigger())
 .pipe(gulp.dest(path.build.html))
 .pipe(reload({stream: true}));
 });

gulp.task('php:build', function () {
 gulp.src(path.src.php)
 .pipe(gulp.dest(path.build.php))
 .pipe(reload({stream: true}));
 });

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
//        .pipe(sourcemaps.init())
//        .pipe(uglify())
//        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
//        .pipe(sourcemaps.init())
        .pipe(less({
            includePaths: ['src/less/'],
            outputStyle: 'compressed',
//            sourceMap: true,
            errLogToConsole: true
        }))
//        .pipe(prefixer())
//        .pipe(cssmin())
//        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});


gulp.task('image:build', function () {
    gulp.src(path.src.img)
/*    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()],
        interlaced: true
    }))*/
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('video:build', function() {
    gulp.src(path.src.video)
        .pipe(gulp.dest(path.build.video))
});

gulp.task('build', [
    'html:build',
    'php:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'video:build'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
     });
    watch([path.watch.php], function(event, cb) {
        gulp.start('php:build');
     });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.video], function(event, cb) {
        gulp.start('video:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('default', ['build', 'webserver', 'watch']);

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});