const tape = require('tape')

tape('default test', t => {
	t.plan(1)
	t.equal(typeof Date.now, 'function')
})
