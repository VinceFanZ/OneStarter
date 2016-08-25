import 'styles/index.less'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { useRouterHistory, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { createHashHistory } from 'history'
import injectTapEventPlugin from 'react-tap-event-plugin'
import configureStore from './store/configureStore'
import routes from './routes'

const store = configureStore()
const history = useRouterHistory(createHashHistory)({ queryKey: false })

injectTapEventPlugin()
syncHistoryWithStore(history, store)

render(
  <Provider store={store}>
    <Router history={history} children={routes} />
  </Provider>,
  document.getElementById('root')
)
