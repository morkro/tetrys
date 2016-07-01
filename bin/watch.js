const watch = require('node-watch');
const debug = require('debug')('app:watcher');
const { buildHTML, buildScripts, buildCSS } = require('./build.js');

watch('./src/index.html', { recursive: true }, () => {
	debug('rebuild html');
	buildHTML();
});

watch('./src/scripts', { recursive: true }, () => {
	debug('rebuild scripts');
	buildScripts();
});

watch('./src/styles', { recursive: true }, () => {
	debug('rebuild styles');
	buildCSS();
});
