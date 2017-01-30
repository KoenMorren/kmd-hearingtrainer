var gulp = require('gulp');
var del  = require('del'); 

gulp.task('clean_dist', () => {
	return del('./dist/*');
});

gulp.task('clean_tmp', () => {
	return del('./tmp');
});