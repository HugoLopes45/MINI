/*!
* gulp
* $ npm install gulp-compass gulp-ruby-sass@1.0.0-alpha gulp-sourcemaps gulp-autoprefixer gulp-plumber gulp-minify-css gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
* npm install gulp-compass --save-dev

*/

// Load Plugins
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    compass = require('gulp-compass'),
    // sass = require('gulp-ruby-sass'),
    // sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

//Styles
gulp.task('styles', function() {
// return sass('src/styles/app.scss', { sourcemap: true })
    return gulp.src('src/styles/app.scss')
    .pipe(plumber({
        errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(compass({
      config_file: 'config.rb',
      css: 'assets/styles/',
      sass: 'src/styles/'
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('assets/styles'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('assets/styles'))
    .pipe(notify({ message: 'Styles task complete' }));
});

//Scripts
// gulp.task('scripts', function() {
//   return gulp.src('src/scripts/**/*.js')
//     .pipe(jshint('.jshintrc'))
//     .pipe(jshint.reporter('default'))
//     .pipe(concat('main.js'))
//     .pipe(gulp.dest('assets/js'))
//     .pipe(rename({suffix: '.min'}))
//     .pipe(uglify())
//     .pipe(gulp.dest('assets/js'))
//     .pipe(notify({ message: 'Scripts task complete' }));
// });

//Images
gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function(cb) {
    del(['assets/styles', 'assets/img', 'assets/js'], cb)
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/scripts/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

  // Create LiveReload server
  //livereload.listen();

  // Watch any files in dist/, reload on change
  //gulp.watch(['assets/**']).on('change', livereload.changed);

});

// Default task
gulp.task('default', ['clean', 'watch'], function() {
    gulp.start('styles', 'images');
});