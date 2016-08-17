import throttle from 'lodash/throttle'
import { createStore } from 'redux'
import reducers from '../reducers'
import { loadState, saveState } from '../utils'

const persistedState = loadState()
const store = createStore(
	reducers,
	persistedState,
	window.devToolsExtension && window.devToolsExtension()
)

store.subscribe(throttle(() =>
	saveState({
		score: store.getState().score
	})
), 5000)

export default store
