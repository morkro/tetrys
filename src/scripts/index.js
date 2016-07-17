import Controls from './components/controls'
import Keyboard from './components/keyboard'
import Canvas from './components/canvas'
import ScoreDisplay from './components/scoredisplay'

const score = new ScoreDisplay('.tetrys-score')
const game = new Canvas('#game')
const controls = new Controls('.tetrys-controls')

score.init()
game.init()
controls.addEvents()
Keyboard.addEvents()
