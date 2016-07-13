import { createStore } from 'redux'
import reducers from '../reducers'

const store = createStore(
	reducers,
	window.devToolsExtension ? window.devToolsExtension() : f => f
)

export default store
