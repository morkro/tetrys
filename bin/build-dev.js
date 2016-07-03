const build = require('./build.js');

build.html();
build.scripts();

require('./watch.js');
require('../server.js');
