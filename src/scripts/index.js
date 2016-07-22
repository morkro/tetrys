import Keyboard from './components/keyboard'
import Controls from './components/controls'
import Canvas from './components/canvas'
import { installServiceWorker } from './utils/serviceWorker'

installServiceWorker()

// Initialise UI
const game = new Canvas('#game')
Keyboard.addEvents()
Controls.addEvents()
game.init()
