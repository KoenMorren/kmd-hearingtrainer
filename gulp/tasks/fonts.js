var gulp = require('gulp');

gulp.task('fonts', () => {
	return gulp.src('./source/fonts/**/*.*')
			   .pipe(gulp.dest('./dist/css/fonts/'));
});