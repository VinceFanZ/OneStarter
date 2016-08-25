import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from 'reducers/root'

export default function configureStore() {
  const middlewares = [thunk]

  if (process.env.NODE_ENV === 'development') {
    const createLogger = require('redux-logger')

    const logger = createLogger({ collapsed: true })
    middlewares.push(logger)
  }

  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
  const store = createStoreWithMiddleware(rootReducer)

  // if (module.hot) {
  //   // Enable Webpack hot module replacement for reducers
  //   module.hot.accept('../reducers', () => {
  //     const nextRootReducer = require('../reducers/index')

  //     store.replaceReducer(nextRootReducer)
  //   })
  // }

  return store
}
