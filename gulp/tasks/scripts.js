//modules
var gulp = require('gulp');
var path = require('path');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var config = require('../config.json');

gulp.task('vendor', () => {
	return gulp.src(config.vendor)
			   .pipe(concat('vendor.js'))
			   .pipe(gulpif(config.productionEnv, uglify()))
			   .pipe(gulp.dest('./dist/js/'));
});

gulp.task('scripts', () => {
	var basepath = './source/app/';

	return gulp.src([
				path.join(basepath, '**/*.module.js'),
				path.join(basepath, '**/*.js')
			])
			.pipe(gulpif(config.productionEnv, concat(config.moduleName + '.js')))
			.pipe(gulpif(config.productionEnv, uglify()))
			.pipe(gulpif(config.productionEnv, gulp.dest('./dist/js/')))
			.pipe(gulpif(!config.productionEnv, gulp.dest('./dist/js/app/')));
});

gulp.task('watch:scripts', () => {
	gulp.watch('./source/js/**/*.js', ['scripts']);
});