const build = require('./build.js')
const debug = require('debug')('tetrys:build')

debug('start development build')
build.html()
build.scripts()

require('./watch.js')
require('../server.js')
