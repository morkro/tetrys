const build = require('./build.js');

build.buildHTML();
build.buildScripts();

require('./watch.js');
require('../server.js');
