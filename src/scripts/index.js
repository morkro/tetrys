import installServiceWorker from './utils/serviceWorker'
import addKeyboardEvents from './components/keyboard'
import addButtonEvents from './components/buttons'
import createCanvas from './components/canvas'

createCanvas('#game')
installServiceWorker()
addKeyboardEvents()
addButtonEvents()
