const path = require('path')
const express = require('express')
const debug = require('debug')('tetrys:server')

const server = express()
const folder = path.resolve('./dist')
debug('booting web application server')

server
	.set('port', process.env.PORT || 9000)
	.use(express.static(folder))
	.get('*', (req, res) => {
		debug(`${req.method} ${req.url}`)
		res.sendFile(`${folder}/index.html`)
	})
	.listen(server.get('port'), (error) => {
		if (error) {
			return debug(error)
		}
		debug(`application is running at localhost:${server.get('port')}`)
	})
