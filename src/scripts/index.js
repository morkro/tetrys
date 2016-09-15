import throttle from 'lodash/throttle'
import FontFaceObserver from 'fontfaceobserver'
import configureStore from './store'
import { saveState, installServiceWorker } from './utils'
import { Router, PageControls, KeyboardControls, Canvas, ScoreObserver } from './components'

const store = configureStore()
const route = new Router({ defaultRoute: 'menu' })
const pageControls = new PageControls({ selector: 'button, [role=button]', store })
const keyboardControls = new KeyboardControls({ scope: window, store })
const game = new Canvas({ selector: '#game', store })
const scoreObserver = new ScoreObserver(store)
const fontSourceCodePro = new FontFaceObserver('Source Code Pro')

fontSourceCodePro.load().then(() =>
	document.body.classList.add('fonts-loaded')
)

// Save game data to localStorage periodically
store.subscribe(throttle(() => {
	saveState({ score: store.getState().score })
}, 5000))

// Initialise all modules
installServiceWorker()
pageControls.addEvents()
keyboardControls.addEvents()
scoreObserver.init()
game.init()

// Init routing
route.init(view => document.body.classList.add(`page-${view}`))
route.onUpdate((current, previous) => {
	document.body.classList.remove(`page-${previous}`)
	document.body.classList.add(`page-${current}`)

	if (previous === 'play') game.stop()
	if (current === 'play') game.start()
	if (current === 'score') scoreObserver.updateScoreBoard()
})
