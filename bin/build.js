const fs = require('fs-extra');
const browserify = require('browserify');
const debug = require('debug')('app:build');

module.exports = {
	buildHTML () {
		debug('build html files');
		fs.copy('./src/index.html', './dist/index.html',
			{ clobber: true },
			(error) => {
				if (error) return debug(error);
			}
		);
	},

	buildScripts () {
		debug('build javascript');
		browserify('./src/scripts/index.js')
			.transform('babelify', { presets: ['es2015'] })
			.bundle()
			.pipe(fs.createWriteStream('./dist/index.js'));
	},

	buildCSS () {
		debug('build css files');
	}
};
