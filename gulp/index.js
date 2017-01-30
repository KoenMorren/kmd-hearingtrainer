//modules
var fse = require('fs-extra');
var tasks = fse.readdirSync('./gulp/tasks/');

//config
var config = require('./config.json');

tasks.forEach(function (task) {
	require('./tasks/' + task);
});