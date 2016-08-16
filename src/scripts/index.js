import Keyboard from './components/keyboard'
import Buttons from './components/buttons'
import Views from './components/views'
import Canvas from './components/canvas'
import { installServiceWorker } from './utils/serviceWorker'

installServiceWorker()

// Initialise UI
const game = new Canvas('#game')
Keyboard.addEvents()
Buttons.addEvents()
Views.addEvents()
game.init()
