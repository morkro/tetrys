import Controls from './components/Controls'
import Keyboard from './components/Keyboard'
import Canvas from './components/Canvas'

const game = new Canvas('#game')
const controls = new Controls('.tetrys-controls')

game.init()
controls.addEvents()
Keyboard.addEvents()
