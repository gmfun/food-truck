/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat');

// create a default task
gulp.task('default', ['concat', 'watch']);

gulp.task('concat', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
    return gulp.watch('js/*.js', ['concat'])
})