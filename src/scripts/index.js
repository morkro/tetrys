import { startGame } from './actions/start';

export default class Foo {
	start () {
		console.log(startGame('now!'));
	}
}

const foo = new Foo();
foo.start();
