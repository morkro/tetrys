import Controls from './components/controls';
import Canvas from './components/canvas';

const game = new Canvas('#game');
const controls = new Controls('.controls-btn');

controls.addEvents();
game.init();
