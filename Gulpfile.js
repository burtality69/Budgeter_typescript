var gulp = require('gulp');
var typescript = require('gulp-tsc');
var sass = require('gulp-sass');
var tsconfig = require('./tsconfig.json');
 
gulp.task('compile', function(){
  gulp.src(['all.d.ts'])
    .pipe(typescript(
        {target: 'es5'}))
    .pipe(gulp.dest('./release/app.js'))
});

gulp.task('styles', function() {
    gulp.src('styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('styles/'));
});

gulp.task('watch', function () {
    gulp.watch('all.d.ts', ['compile']);
    gulp.watch('styles/*.scss',['styles']);
});

