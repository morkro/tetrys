import throttle from 'lodash/throttle'
import { saveState } from './utils'
import configureStore from './store/configureStore'
import installServiceWorker from './utils/serviceWorker'
import PageControls from './components/pageControls'
import KeyboardControls from './components/keyboardControls'
import Canvas from './components/canvas'

const store = configureStore()
const pageControls = new PageControls({ selector: 'button, [role=button]', store })
const keyboardControls = new KeyboardControls({ scope: window, store })
const game = new Canvas({ selector: '#game', store })

store.subscribe(throttle(() => {
	const { score } = store.getState()
	saveState({ score })
}, 5000))

installServiceWorker()
pageControls.addEvents()
keyboardControls.addEvents()
game.init()
