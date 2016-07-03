import { createStore } from 'redux';
import reducer from '../reducers';

const { devToolsExtension } = window;
const store = createStore(
	reducer,
	devToolsExtension && devToolsExtension()
);
export default store;
