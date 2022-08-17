var gulp       = require('gulp')
var sass       = require('gulp-sass')(require('sass'));
var livereload = require('gulp-livereload')
var minify     = require('gulp-minify')
var minifyCss  = require('gulp-minify-css')
var path       = require('path')
var rename     = require("gulp-rename")
var cache      = require('gulp-cached')

gulp.task('sass', function () {
  return gulp.src('public/scss/style.min.scss')
     .pipe(sass())
     .pipe(minifyCss({ compatibility: 'ie11' }))
     .pipe(gulp.dest(path.join(__dirname, '/public/css/')))
     .pipe(livereload())
});

// gulp.task('js', function() {
//   return gulp.src([ "_js/*.js" ])
//      .pipe(cache('linting'))
//      .pipe(minify({
//         ext: {
//            min: '.min.js'
//         },
//         noSource: true
//      }))
//      // .pipe(rename({ suffix: '.min' }))
//      .pipe(gulp.dest(path.join(__dirname, '/js/')))
//      .pipe(livereload())
// });

// Watch Files For Changes
gulp.task('watch', function () {
  livereload.listen()
  gulp.watch('public/scss/*.scss', gulp.series('sass'))
  // gulp.watch([
  //    '_js/*.js'
  // ], gulp.series('js'));
});
