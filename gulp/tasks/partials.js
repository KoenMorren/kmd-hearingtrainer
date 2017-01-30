var gulp = require('gulp');
var path = require('path');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var config = require('../config.json');

var TEMPLATE_HEADER = [
	'(function () {\r\n',
	'    \'use strict\';\r\n',
	'\r\n',
	'    angular.module(\'<%= module %>\'<%= standalone %>)\r\n',
	'           .run([\'$templateCache\', function($templateCache) {\r\n'].join('');
var TEMPLATE_BODY = '        $templateCache.put(\'<%= url %>\',\'<%= contents %>\');';
var TEMPLATE_FOOTER = [
	'\r\n',
	'    }]);\r\n',
	'})();'].join('');

var htmlminOptions = { collapseWhitespace: true };

gulp.task('partials', () => {
	return gulp.src('tmp/templates/**/*.js')
			   .pipe(concat('templates.js'))
			   .pipe(gulpif(config.productionEnv, uglify()))
			   .pipe(gulp.dest('./source/app/templatecache/'));
});

gulp.task('partialsJS', () => {
	var templateCacheOptions = {
		root: './js/',
		module: config.moduleName,
		templateHeader: TEMPLATE_HEADER,
		templateBody: TEMPLATE_BODY,
		templateFooter: TEMPLATE_FOOTER,
		filename: 'templatesJS.js'
	};

	return gulp.src('./source/js/**/*.html')
			   .pipe(htmlmin(htmlminOptions))
			   .pipe(templateCache(templateCacheOptions))
			   .pipe(gulp.dest('./tmp/templates/'));
});

gulp.task('partialsHTML', () => {
	var templateCacheOptions = {
		root: '../partials/',
		module: config.moduleName,
		templateHeader: TEMPLATE_HEADER,
		templateBody: TEMPLATE_BODY,
		templateFooter: TEMPLATE_FOOTER,
		filename: 'templatesPartials.js'
	};

	 return gulp.src('./source/partials/**/*.html')
			   .pipe(htmlmin(htmlminOptions))
			   .pipe(templateCache(templateCacheOptions))
			   .pipe(gulp.dest('./tmp/templates/'));
});