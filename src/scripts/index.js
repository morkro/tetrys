import Menu from './components/menu'
import Keyboard from './components/keyboard'
import Canvas from './components/canvas'
// import ScoreBoard from './components/scoreboard'

const game = new Canvas('#game')

Keyboard.addEvents()
Menu.addEvents()
game.init()
// ScoreBoard.init()
