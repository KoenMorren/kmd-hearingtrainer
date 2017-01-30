var gulp = require('gulp');

gulp.task('icons', () => {
	return gulp.src('./source/*.ico')
			   .pipe(gulp.dest('./dist/'));
});