var gulp = require('gulp');
var typescript = require('gulp-tsc');
var sass = require('gulp-sass');
 
gulp.task('compile', function(){
  gulp.src(['src/**/*.*'])
    .pipe(typescript())
    .pipe(gulp.dest('dist/'))
});

gulp.task('styles', function() {
    gulp.src('styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('styles/'));
});

gulp.task('watch', function () {
    gulp.watch('scripts/**/*.*', ['compile']);
    gulp.watch('styles/*.scss',['styles']);
});

