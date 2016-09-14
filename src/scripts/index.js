import throttle from 'lodash/throttle'
import FontFaceObserver from 'fontfaceobserver'
import configureStore from './store/configureStore'
import { saveState, installServiceWorker } from './utils'
import { PageControls, KeyboardControls, Canvas, ScoreBoard } from './components'

const store = configureStore()
const pageControls = new PageControls({ selector: 'button, [role=button]', store })
const keyboardControls = new KeyboardControls({ scope: window, store })
const game = new Canvas({ selector: '#game', store })
const scoreBoard = new ScoreBoard({ selector: '.tetrys-scoreboard', store })
const fontSourceCodePro = new FontFaceObserver('Source Code Pro')

// Save game data to localStorage periodically
store.subscribe(throttle(() => {
	const { score } = store.getState()
	saveState({ score })
}, 5000))

// Initialise all modules
fontSourceCodePro.load().then(() => document.body.classList.add('fonts-loaded'))
installServiceWorker()
pageControls.addEvents()
keyboardControls.addEvents()
scoreBoard.init()
game.init()

// Update views on hash change
window.addEventListener('hashchange', ({ oldURL, newURL }) => {
	const oldLocation = oldURL.split('#')[1]
	const newLocation = newURL.split('#')[1]

	// When leaving a view
	switch (oldLocation) {
	case 'play': return game.stop()
	default: break
	}

	// When entering a view
	switch (newLocation) {
	case 'play': return game.start()
	case 'score': return scoreBoard.update()
	default: break
	}
})
