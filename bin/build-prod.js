const build = require('./build.js')
const debug = require('debug')('tetrys:build')

debug('start production build')
build.html()
build.assets()
build.scripts()
build.css()
