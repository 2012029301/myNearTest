import {createStore, applyMiddleware} from 'redux'
import createRootReducer from './reducers/'
import {routerMiddleware} from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'

import request_3_phase from './middlewares/request_3_phase'
import handle_error from './middlewares/handle_error'
import actionLog from './middlewares/actionLog'
import {createHashHistory} from 'history'
import websocket from './middlewares/websocket'
import sessionStorageMiddleware from './middlewares/sessionStorageMiddleware'

export const hashHistory = createHashHistory()

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
})
let store = createStore(createRootReducer(hashHistory),
  {},
  composeEnhancers(
    applyMiddleware(routerMiddleware(hashHistory),
      request_3_phase,
      websocket,
      handle_error,
      actionLog,
      sessionStorageMiddleware)
  )
)

export default store
