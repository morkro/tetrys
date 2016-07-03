const fs = require('fs-extra');
const browserify = require('browserify');
const debug = require('debug')('app:build');

module.exports = {
	html () {
		debug('build html files');
		fs.copy('./src/index.html', './dist/index.html',
			{ clobber: true },
			(error) => {
				if (error) return debug(error);
			}
		);
	},

	scripts () {
		debug('build javascript');
		browserify('./src/scripts/index.js')
			.transform('babelify', { presets: ['es2015'] })
			.bundle()
			.pipe(fs.createWriteStream('./dist/index.js'));
	},

	css () {
		debug('build css files');
	}
};
