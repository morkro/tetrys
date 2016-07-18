const build = require('./build.js')
const debug = require('debug')('tetrys:build')

debug('start development build')
build.html()
build.manifest()
build.scripts()
build.css()

require('./watch.js')
require('../server.js')
