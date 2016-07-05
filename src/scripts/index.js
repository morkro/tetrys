import Controls from './components/controls';
import Keyboard from './components/keyboard';
import Canvas from './components/canvas';

const game = new Canvas('#game');
const controls = new Controls('.tetrys-controls');

game.init();
controls.addEvents();
Keyboard.addEvents();
