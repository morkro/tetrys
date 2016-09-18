import throttle from 'lodash/throttle'
import FontFaceObserver from 'fontfaceobserver'
import configureStore from './store'
import { saveState, installServiceWorker } from './utils'
import { Router, PageControls, KeyboardControls, TetrisGame, ScoreObserver } from './components'

const store = configureStore()
const route = new Router({ defaultRoute: 'menu' })
const pageControls = new PageControls(store)
const keyboardControls = new KeyboardControls(store)
const tetrisGame = new TetrisGame(store)
const scoreObserver = new ScoreObserver(store)
const fontSourceCodePro = new FontFaceObserver('Source Code Pro')

// Update fonts when finished loading.
fontSourceCodePro.load().then(() =>
	document.body.classList.add('fonts-loaded')
)

// Save game data to localStorage periodically
store.subscribe(throttle(() => {
	saveState({ score: store.getState().score })
}, 5000))

// Init routing
route.init(view => document.body.classList.add(`page-${view}`))
route.onRouteChange((previous, current) => {
	document.body.classList.remove(`page-${previous}`)
	document.body.classList.add(`page-${current}`)

	if (previous === 'play') tetrisGame.stop()
	if (current === 'play') tetrisGame.start()
	if (current === 'score') scoreObserver.updateScoreBoard()
})

// Initialise all modules
installServiceWorker()
pageControls.addEvents()
keyboardControls.addEvents()
scoreObserver.init()
tetrisGame.init()
