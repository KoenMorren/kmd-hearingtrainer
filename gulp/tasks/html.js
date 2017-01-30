var gulp = require('gulp');
var inject = require('gulp-inject');
var config = require('../config.json');

gulp.task('html', () => {
	var styles = gulp.src('./dist/css/**/*.css', { read: false });
	var vendor = gulp.src('./dist/js/vendor.js', { read: false });
	var app = config.productionEnv ? gulp.src('./dist/js/' + config.moduleName + '.js', { read: false }) : gulp.src('./dist/js/app/**/*.js', { read: false });

	return gulp.src('./source/index.html')
			   .pipe(gulp.dest('./dist/'))
			   .pipe(inject(styles, { relative: true, name: 'styles'}))
			   .pipe(inject(vendor, { relative: true, name: 'vendor'}))
			   .pipe(inject(app, { relative: true, name: 'app'}))
			   .pipe(gulp.dest('./dist/'));
});