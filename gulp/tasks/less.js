//modules
var gulp = require('gulp');
var less = require('gulp-less');
var clean = require('gulp-clean-css');
var concat = require('gulp-concat-css');

gulp.task('less', () => {
	return gulp.src('./source/**/*.less')
			   .pipe(less())
			   .pipe(concat('style.css'))
			   .pipe(clean())
			   .pipe(gulp.dest('./dist/css/'));
});

gulp.task('watch:less', () => {
	gulp.watch('./source/less/**/*.less', ['less']);
});