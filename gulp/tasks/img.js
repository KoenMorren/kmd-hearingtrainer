var gulp = require('gulp');

gulp.task('img', function() {
	return gulp.src('./source/img/**/*.*')
			   .pipe(gulp.dest('./dist/img/'))
});